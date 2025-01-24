/**
 * @file Application logging utility
 * @copyright Chris Bunting 2023
 * @license MIT
 */

import winston from 'winston';
import config from 'config';

const logger = winston.createLogger({
  level: config.get('logging.level'),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ 
      filename: config.get('logging.file'),
    }),
    new winston.transports.Console(),
  ],
});

export default logger;
