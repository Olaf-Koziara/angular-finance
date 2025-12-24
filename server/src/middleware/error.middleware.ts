import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../utils/errors';
import { sendError } from '../utils/response';
import { logger } from '../utils/logger';
import { config } from '../config';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  // Log error
  logger.error('Error occurred:', {
    message: err.message,
    stack: config.IS_DEVELOPMENT ? err.stack : undefined,
    url: req.url,
    method: req.method,
  });

  // Handle known operational errors
  // NOTE: In some runtime setups (ts-jest/tsx) `instanceof` can fail due to module duplication.
  // We therefore also fall back to checking by `name`.
  if (err instanceof ValidationError || (err as any)?.name === "ValidationError") {
    return sendError(res, err.message, (err as any).statusCode ?? 400, (err as any).errors);
  }

  if (err instanceof AppError || (err as any)?.statusCode) {
    return sendError(res, err.message, (err as any).statusCode ?? 500);
  }

  // Handle unknown errors - don't leak details in production
  const message = config.IS_PRODUCTION
    ? 'An unexpected error occurred'
    : err.message;

  return sendError(res, message, 500);
};

export const notFoundHandler = (
  req: Request,
  res: Response
): Response => {
  return sendError(res, `Route ${req.method} ${req.url} not found`, 404);
};
