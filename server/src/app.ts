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
  
  // CORS configuration
  app.use(
    cors({
      origin: config.CORS_ORIGIN,
      credentials: true,
    })
  );

  // Cookie parsing middleware
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
