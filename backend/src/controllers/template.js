const Templates = require("../models/template");

const templateController = {};

templateController.get = async (req, res) => {
    res.json({
        message: "Hello from get!"
    });
};

templateController.create = async (req, res) => {
    res.json({
        message: "Hello from create!"
    });
};

templateController.edit = async (req, res) => {
    res.json({
        message: "Hello from edit!"
    });
};

templateController.delete = async (req, res) => {
    res.json({
        message: "Hello from delete!"
    });
};

module.exports = templateController;