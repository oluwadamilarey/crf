import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';

import logger from '@/lib/logger';

import {
  API_METHODS,
  UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
} from '@/actions/action.constants';
import { INetworkErrorResponse } from '@/actions/action.types';
import { unauthenticatedServerAction } from '@/actions/server-action';
import { AppError } from '@/utils/error';

const baseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: (typeof API_METHODS)[number];
      data?: object | FormData;
      params?: object | void | null;
    },
    unknown,
    unknown
  > =>
  async (args) => {
    const { url, method, data, params } = args;
    try {
      const fetchOptions: RequestInit = {
        method,
        body:
          data && !['GET', 'DELETE'].includes(method)
            ? data instanceof FormData
              ? data // Use FormData directly
              : JSON.stringify(data) // Otherwise, stringify the data
            : undefined,
        next: {
          tags: [url],
        },
      };

      if (data && !(data instanceof FormData)) {
        fetchOptions.headers = {
          'Content-Type': 'application/json',
        };
      }

      const response = await unauthenticatedServerAction({
        url,
        options: fetchOptions,
        params,
      });

      if (response.status < 400) {
        return { data: response ? response : null };
      }

      throw new AppError(
        response.message || 'Something went wrong',
        response.status,
      );
    } catch (error) {
      logger({ error, url });

      if (error instanceof AppError) {
        return {
          error: {
            status: error.statusCode,
            message: error.message,
          },
        };
      }

      return {
        error: {
          status: null,
          message:
            (error as INetworkErrorResponse).message || 'Something went wrong',
        },
      };
    }
  };

export const unauthenticated_global_api = createApi({
  baseQuery: baseQuery(),
  reducerPath: UNAUTHENTICATED_GLOBAL_API_REDUCER_PATH,
  endpoints: () => ({}),
  tagTypes: [],
});
