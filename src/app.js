// src/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const routes = require('./routes/user.routes'); // Import the routes
const api = require('./routes/apiRoute.js'); // Import the api routes
const errorHandler = require('./middleware/error.middleware.js'); // Custom error handler middleware
const { connectDatabase } = require('./config/database.js'); // Database connection logic
require('dotenv').config(); // Load .env variables
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000; // Load the port from .env or use 3000 as default

// Create a write stream for logging HTTP requests to a file
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs', 'http.log'), { flags: 'a' });


// Session configuration
app.use(session({
    secret: process.env.DEV_JWT_SECRET,  // You should use a secure and random key for production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set secure to true in production with HTTPS
}));




// Middleware
app.use(helmet()); // Security middleware
app.use(cors()); // Cross-Origin Resource Sharing
app.use(morgan('combined', { stream: accessLogStream })); // HTTP request logger
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
// Add middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use('/', routes); // Prefix all routes with /
app.use('/api', api); // Prefix all routes with /api

// Custom 404 Route for unmatched URLs
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found',
    });
});

// Global Error Handler Middleware
// app.use(errorHandler); // Handles any errors that occur during request processing

// Create an HTTP server
const server = http.createServer(app);

// Connect to the database
connectDatabase()
    .then(() => {
        // Start the server
        server.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process with failure code
    });

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection at:', error.stack || error);
    server.close(() => {
        process.exit(1); // Exit with failure code
    });
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Shutting down gracefully.');
    server.close(() => {
        console.log('Process terminated');
    });
});
