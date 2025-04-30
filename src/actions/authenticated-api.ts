import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import logger from '@/lib/logger';

import {
  API_METHODS,
  AUTHENTICATED_GLOBAL_API_REDUCER_PATH,
} from '@/actions/action.constants';
import { INetworkErrorResponse } from '@/actions/action.types';
import { signOutAction } from '@/actions/auth/auth-actions.server';
import { authenticatedServerAction } from '@/actions/server-action';
import { AppError } from '@/utils/error';

const SignOutManager = {
  isSigningOut: false,
  signOutPromise: null as Promise<void> | null,

  async signOut() {
    if (this.isSigningOut) {
      // If already signing out, return the existing promise
      return this.signOutPromise;
    }

    this.isSigningOut = true;
    this.signOutPromise = signOutAction().finally(() => {
      toast.error('Session expired');

      this.isSigningOut = false;
      this.signOutPromise = null;
    });

    return this.signOutPromise;
  },
};

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

      const response = await authenticatedServerAction({
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
      logger(error);

      if (error instanceof AppError) {
        if (error.statusCode === 401) {
          SignOutManager.signOut();
          logger(error);
        }
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

export const authenticated_global_api = createApi({
  baseQuery: baseQuery(),
  reducerPath: AUTHENTICATED_GLOBAL_API_REDUCER_PATH,
  endpoints: () => ({}),
  // tagTypes: Object.values(AuthenticatedTagTypes),
});
