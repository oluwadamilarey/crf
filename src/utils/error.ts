import { toast } from 'sonner';

import logger from '@/lib/logger';

// TODO: UPDATE ERROR CLASS
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// TODO: HANDLE ERROR
export const handleErrors = (error: unknown) => {
  logger({ error });

  if (error instanceof Error) {
    logger(
      {
        error: error.message,
      },
      'App Error',
    );

    if (typeof error.message === 'string') {
      toast.error(error.message);

      return;
    }
  }

  if (
    typeof error === 'object' &&
    !!error &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    toast.error(error.message);

    return;
  }
};
