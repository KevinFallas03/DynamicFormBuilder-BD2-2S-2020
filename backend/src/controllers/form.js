const Forms = require("../models/form");

const formController = {};

formController.get = async (req, res) => {
    res.json({
        message: "Hello from get!"
    });
};

formController.create = async (req, res) => {
    res.json({
        message: "Hello from create!"
    });
};

formController.edit = async (req, res) => {
    res.json({
        message: "Hello from edit!"
    });
};

formController.delete = async (req, res) => {
    res.json({
        message: "Hello from delete!"
    });
};

module.exports = formController;