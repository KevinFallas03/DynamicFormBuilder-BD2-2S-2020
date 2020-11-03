const User = require("../models/User");

/*
    All functions related to user maniupulation in the database.
*/
const usersController = {};

// C R U D
usersController.createUser = async (req, res) => {
    res.send("CREATING A NEW USER");
}


usersController.getUser = async (req, res) => {
    res.send("GETTING A SPECIFIC USER");
}


usersController.getUsers = async (req, res) => {
    res.send("GETTING ALL USERS...");
}


usersController.updateUser = async (req, res) => {
    res.send("UPDATING A USER");
}


usersController.deleteUser = async (req, res) => {
    res.send("DELETING A USER");
}


module.exports = usersController;
