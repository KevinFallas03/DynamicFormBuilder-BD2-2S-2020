/*
    Routes related to a user's home page.
*/
const express = require('express');
const router = express.Router();

const userController = require("../controllers/usersController"); 
const auth = require('../middleware/auth');

// Needs authentication from the log in
router.get('/', auth, (req, res) => {
    // Gets the logged in user 
    // req.user comes from auth middleware
    res.send(req.user);
});


// Logs off the user from the system they are using.

// Logs off the user from every device.


module.exports = router;