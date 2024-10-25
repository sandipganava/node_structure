// src/middleware/error.middleware.js

// General error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`, err);

    // Default error status code is 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;
    
    // Send error response
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Hide stack in production
    });
};

// Middleware to handle 404 errors (Route not found)
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error); // Forward to the general error handler
};

module.exports = {
    errorHandler,
    notFoundHandler,
};
