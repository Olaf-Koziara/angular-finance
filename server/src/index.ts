import { createApp } from './app';
import { config } from './config';
import { disconnectDatabase } from './config/database';
import { logger } from './utils/logger';

const app = createApp();

const server = app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
  logger.info(`Environment: ${config.NODE_ENV}`);
  logger.info(`CORS origin: ${config.CORS_ORIGIN}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string): Promise<void> => {
  logger.info(`${signal} received, shutting down gracefully...`);

  server.close(async () => {
    logger.info('HTTP server closed');

    try {
      await disconnectDatabase();
      logger.info('Database connection closed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during shutdown:', error);
      process.exit(1);
    }
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
  logger.error('Unhandled Rejection:', reason);
  gracefulShutdown('unhandledRejection');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});
