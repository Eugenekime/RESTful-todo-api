import type { Request, Response, NextFunction } from 'express';

type ErrorWithDetails = {
  status?: number;
  message?: string;
  stack?: string;
};

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  const error = err as ErrorWithDetails;

  const status = error.status ?? 500;
  const message = error.message ?? 'Internal Server Error';

  const response: {
    success: false;
    error: string;
    stack?: string;
  } = {
    success: false,
    error: message,
  };

  if (process.env.NODE_ENV !== 'production' && error.stack) {
    response.stack = error.stack;
  }

  return res.status(status).json(response);
}
