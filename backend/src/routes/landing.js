/*
    Routes related to the landing page
*/
const express = require('express');
const router = express.Router();

const userController = require("../controllers/usersController");


// Post method to create a new account
router.post('/', userController.createUser);


// Get method for log in
router.get('/', userController.getUser);


module.exports = router;