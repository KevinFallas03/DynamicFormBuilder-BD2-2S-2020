/*
    AUTHENTICATION MIDDLEWARE
*/ 
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv/config');

// Authorization function, sets the request information
const auth = async(req, res, next) => {
    
    try {
        
        // Token format "Bearer (token)"
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.TOKEN_KEY);

        // Finds the user
        const user = await User.findOne({_id: data._id, 'tokens.token': token});

        if (!user) {
            throw new Error();
        }

        // Sets the request information
        req.user = user;
        req.token = token;

        // Finishes running the middleware
        next();
    } catch (error) {
        res.status(401).json({error: "Unathorized"});
    }

}

module.exports = auth;