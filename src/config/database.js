// src/config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; 
        await mongoose.connect(mongoURI, {});
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // Rethrow the error to be caught in the server.js
    }
};

// Export the function
module.exports = { connectDatabase };
