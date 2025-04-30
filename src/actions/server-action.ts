'use server';

import logger from '@/lib/logger';

import { INetworkErrorResponse } from '@/actions/action.types';
import { AppError } from '@/utils/error';

const BASE_URL = process.env.API_URL;

interface ServerActionParams {
  url: string;
  options: RequestInit;
  params?: object | void | null;
  timeout?: number;
}

interface ServerActionResponse {
  status: number;
  data?: unknown;
  message?: string;
}

async function executeServerAction({
  url,
  options,
  params,
  timeout = 180000,
  withAuth = false,
}: ServerActionParams & { withAuth?: boolean }): Promise<ServerActionResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Prepare URL
    const queryString = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

    // Add authentication if required
    if (withAuth) {
      // TODO: HANDLE THIS WHEN AUTH IS IMPLEMENTED
      // const session = await auth();
      options.headers = {
        ...options.headers,
        // Authorization: `Bearer ${session?.token.access_token}`,
      };
    }

    // Execute request
    options.signal = controller.signal;
    logger({ fullUrl, options, params, timeout });

    const response = await fetch(`${fullUrl}${queryString}`, options);

    const data = await response.json();

    clearTimeout(timeoutId);
    logger({ data });

    if (!response.ok) {
      const error: INetworkErrorResponse = data;

      throw new AppError(error.message, response.status);
    }

    return data;
  } catch (error) {
    // logger(error);
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        status: 408,
        message: 'Request timed out',
      };
    }

    if (error instanceof AppError) {
      return {
        status: error.statusCode,
        message: error.message,
      };
    }

    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
}

export async function unauthenticatedServerAction(
  params: ServerActionParams,
): Promise<ServerActionResponse> {
  logger({ params }, 'unauthenticatedServerAction called');
  return executeServerAction({ ...params, withAuth: false });
}

export async function authenticatedServerAction(
  params: ServerActionParams,
): Promise<ServerActionResponse> {
  logger({ params }, 'authenticatedServerAction called');
  return executeServerAction({ ...params, withAuth: true });
}
