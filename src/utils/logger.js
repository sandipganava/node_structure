// src/utils/logger.js
const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add a timestamp to each log entry
        winston.format.json() // Log in JSON format
    ),
    transports: [
        // Log to console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Colorize output in console
                winston.format.simple() // Log messages in a simple format
            ),
        }),
        // Log to a file
        new winston.transports.File({
            filename: 'logs/app.log', // Specify the log file path
            level: 'error', // Only log errors to the file
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json() // Log errors in JSON format
            ),
        }),
    ],
});

// Function to log HTTP requests (middleware example)
logger.httpLogger = (req, res, next) => {
    logger.info(`HTTP ${req.method} ${req.url} ${res.statusCode}`);
    next();
};

// Export the logger
module.exports = logger;
