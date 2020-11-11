/*
    Routes related to the landing page
*/
const express = require('express');
const router = express.Router();

const userController = require("../controllers/usersController");

// Post method to create a new account
router.post('/register', userController.createUser);

// Post method for log in
router.post('/login', userController.login);

// Get users for approval routes
router.get('/userDump', userController.getUsersWithMinimalDetails);

module.exports = router;