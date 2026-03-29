/**
 * @copyright  2026 codewithpragati
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import winston from 'winston';

/**
 * Custom modules
 */
import config from '@/config/index';

const { combine, timestamp, json, errors, align, printf, colorize } = winston.format;

// Define the transport array to hold different logging transports
const transports: winston.transport[] = [];

// If the application is not running in production, add a console transport
if (config.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
        align(), // Align log messages
        printf(({ timestamp, level, message, ...metadata }) => {
          const metaStr =
            Object.keys(metadata).length > 0
              ? `\n${JSON.stringify(metadata, null, 2)}`
              : '';

          return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
        })
      ),
    })
  );
}

// Create the logger
const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  format: combine(errors({ stack: true }), json()), // default JSON format for files
  transports,
  silent: config.NODE_ENV === 'test'
});

export { logger } ;