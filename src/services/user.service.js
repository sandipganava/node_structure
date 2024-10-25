// src/services/user.service.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Registers a new user
 * @param {Object} userData - Object containing name, email, and password.
 * @returns {Object} - The newly created user object and JWT token.
 */
const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Create a new user instance
    const user = new User({ name, email, password });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the new user
    const token = user.generateAuthToken();

    return { user, token };
};

/**
 * Logs in a user by validating email and password
 * @param {String} email - The user's email.
 * @param {String} password - The user's password.
 * @returns {Object} - The logged-in user object and JWT token.
 */
const loginUser = async (email, password) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Validate the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // Generate a JWT token for the user
    const token = user.generateAuthToken();

    return { user, token };
};

/**
 * Fetches a user by their ID
 * @param {String} userId - The ID of the user to fetch.
 * @returns {Object} - The fetched user object.
 */
const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

/**
 * Fetches all users
 * @returns {Array} - List of all users.
 */
const getAllUsers = async () => {
    return await User.find().select('-password'); // Exclude passwords in the result
};

/**
 * Updates user details
 * @param {String} userId - The ID of the user to update.
 * @param {Object} updateData - Object containing the fields to update.
 * @returns {Object} - The updated user object.
 */
const updateUser = async (userId, updateData) => {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

/**
 * Deletes a user by their ID
 * @param {String} userId - The ID of the user to delete.
 * @returns {Object} - The deleted user object.
 */
const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
