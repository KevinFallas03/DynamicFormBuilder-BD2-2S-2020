/**
 * CONTROLLER EXAMPLE
 */

const Xyz = require("../models/xyz");

const xyzController = {};

xyzController.getXyz = async (req, res) => {
    res.json({
        message: "Hello from get!"
    });
};

xyzController.createXyz = async (req, res) => {
    res.json({
        message: "Hello from create!"
    });
};

xyzController.editXyz = async (req, res) => {
    res.json({
        message: "Hello from edit!"
    });
};

xyzController.deleteXyz = async (req, res) => {
    res.json({
        message: "Hello from delete!"
    });
};

module.exports = xyzController;