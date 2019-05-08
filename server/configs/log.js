import app_root from 'app-root-path';
import winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const print_log = printf( ({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const options = {
    file: {
        level: "error",
        filename: app_root.path + "/server/lib/log/error_log.log",
        handleExceptions: true,
        json: false,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
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
