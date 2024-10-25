// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const userValidator = require('../validators/user.validator');

// Route to get all users (Admin-only)
router.get('/',  userController.getAllUsers);

// Route to get a specific user by ID
router.get('/:id', authMiddleware.isAuthenticated, userController.getUserById);

// Route to create a new user (with validation)
router.post(
    '/', 
    userValidator.validateUserCreation, // Middleware to validate user input
    userController.createUser
);

// Route to update an existing user
router.put(
    '/:id', 
    authMiddleware.isAuthenticated, 
    userValidator.validateUserUpdate, // Middleware to validate input
    userController.updateUser
);

// Route to delete a user by ID (Admin-only)
router.delete('/:id', authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
