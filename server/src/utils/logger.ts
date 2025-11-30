/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '../config';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private log(level: LogLevel, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    if (meta) {
      console[level](logMessage, meta);
    } else {
      console[level](logMessage);
    }
  }

  info(message: string, meta?: any): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any): void {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: any): void {
    this.log('error', message, meta);
  }

  debug(message: string, meta?: any): void {
    if (config.IS_DEVELOPMENT) {
      this.log('debug', message, meta);
    }
  }
}

export const logger = new Logger();
