const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
const DEV_JWT_SECRET = process.env.DEV_JWT_SECRET;

const authenticateJWT = async (req, res, next) => {
    // Get the token from the session
    const token = req.session.token;

    if (!token) {
        res.redirect('/login');
        // return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token directly (no split needed)
        const decoded = jwt.verify(token, DEV_JWT_SECRET);
        req.user = decoded;

        // Check if the user still exists in the database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticateJWT;
