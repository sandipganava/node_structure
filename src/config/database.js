// src/config/database.js
const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name'; // Replace with your MongoDB URI
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error; // Rethrow the error to be caught in the server.js
    }
};

// Export the function
module.exports = { connectDatabase };
