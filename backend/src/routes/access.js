/*
    Routes related to the landing page
*/
const express = require('express');
const router = express.Router();

const userController = require("../controllers/usersController");
const auth = require('../middleware/auth');

// Post method to create a new account
router.post('/register', userController.createUser);

// Post method for log in
router.post('/login', userController.login);

// Get users for approval routes
router.get('/users', userController.getUsersWithMinimalDetails);

// Authorization route
router.get('/authorize', auth, userController.isAdmin);

// Post method to post to create a new user with or without admin permissions
router.post('/createNew', userController.createUser);

// Edits a specific user
router.patch('/edit', userController.updateUser);

// Obtains all the users from the database
router.get('/:id', userController.getUserInfo);

// Deletes the specified user
router.delete('/:id', userController.deleteUser);

module.exports = router;