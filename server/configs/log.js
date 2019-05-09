import app_root from 'app-root-path';
import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const print_log = printf( ({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const options = {
  file: {
    level: "info",
    filename: app_root.path + "/server/lib/log/info_log",
    handleExceptions: true,
    json: false,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
    format: combine(
      timestamp(),
      print_log
    )
  },

  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(
      timestamp(),
      print_log
    )
  }
};

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file)
  ],
  exitOnError: false, 
});

export default logger;
