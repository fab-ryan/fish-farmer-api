/* eslint-disable import/no-extraneous-dependencies */
import winston, { transports, format } from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    new transports.DailyRotateFile({
      level: 'error',
      filename: 'logs/%DATE%-error.log',
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      handleExceptions: true,
      json: true,
    }),
    new transports.DailyRotateFile({
      filename: 'logs/%DATE%-info.log',
      format: format.combine(format.timestamp(), format.json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '14d',
    }),
  ],
});

export { logger };
