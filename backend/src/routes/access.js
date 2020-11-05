/*
    Routes related to the landing page
*/
const express = require('express');
const router = express.Router();

const userController = require("../controllers/usersController");

// Post method to create a new account
router.post('/register', userController.createUser);

// Get method for log in
router.get('/login', userController.login);


module.exports = router;