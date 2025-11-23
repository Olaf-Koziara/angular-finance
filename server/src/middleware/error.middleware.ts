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
  if (err instanceof ValidationError) {
    return sendError(res, err.message, err.statusCode, err.errors);
  }

  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
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
