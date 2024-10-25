// src/config/config.js
require('dotenv').config(); // Loads environment variables from a .env file into process.env

const config = {
    development: {
        app: {
            port: process.env.DEV_APP_PORT || 3000,
        },
        db: {
            uri: process.env.DEV_DB_URI || 'mongodb://localhost:27017/myapp_dev',
        },
        jwt: {
            secret: process.env.DEV_JWT_SECRET || 'your-dev-secret-key',
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        },
    },
    testing: {
        app: {
            port: process.env.TEST_APP_PORT || 3001,
        },
        db: {
            uri: process.env.TEST_DB_URI || 'mongodb://localhost:27017/myapp_test',
        },
        jwt: {
            secret: process.env.TEST_JWT_SECRET || 'your-test-secret-key',
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        },
    },
    production: {
        app: {
            port: process.env.APP_PORT || 8000,
        },
        db: {
            uri: process.env.DB_URI || 'mongodb://localhost:27017/myapp_prod',
        },
        jwt: {
            secret: process.env.JWT_SECRET || 'your-production-secret-key',
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        },
    },
};

const currentEnv = process.env.NODE_ENV || 'development';

module.exports = config[currentEnv];
