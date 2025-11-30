import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';

export const createApp = (): Application => {
  const app = express();

  // Security middleware
  app.use(helmet());
  
  // CORS configuration - restricts cross-origin requests
  app.use(
    cors({
      origin: config.CORS_ORIGIN,
      credentials: true,
    })
  );

  /**
   * Cookie parsing middleware
   * 
   * CSRF Protection Strategy:
   * We use 'sameSite: strict' on all cookies which prevents the browser from
   * sending cookies on cross-origin requests. Combined with:
   * - CORS origin validation (above)
   * - httpOnly cookies (prevents XSS access to tokens)
   * - Path-scoped cookies (limits exposure)
   * 
   * This provides robust CSRF protection without requiring separate CSRF tokens.
   * See: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#samesite-cookie-attribute
   */
  app.use(cookieParser());

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  if (config.IS_DEVELOPMENT) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  // Custom request logging
  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  // Mount API routes
  app.use('/api', routes);

  // 404 handler
  app.use(notFoundHandler);

  // Error handler (must be last)
  app.use(errorHandler);

  return app;
};
