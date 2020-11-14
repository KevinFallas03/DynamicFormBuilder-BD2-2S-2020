const Forms = require("../models/form");
const Approval = require("../models/Approval");
const Template = require('../models/template');
const template = require("../models/template");

const formController = {};


formController.get = async (req, res) => {
    try {
        const FormsbyUserId = await Forms.find();
        res.status(202).send(FormsbyUserId);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'the request failed', 
              error: err
            }
        );
    }   
}

formController.getRequested = async (req, res) => {
    try {
        const FormsbyUserId = await Forms.find();
        res.status(202).send(FormsbyUserId);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'the request failed', 
              error: err
            }
        );
    }   
}

formController.getPending = async (req, res) => {
    const { idList } = req.params;

    try {

        const aprovalsOfUser = await Forms.find( { template: { $in: idList } } );

        res.status(202).send(aprovalsOfUser);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'the request failed', 
              error: err
            }
        );
    }   
};

formController.getAproved = async (req, res) => {
    res.json({
        message: "Hello from get aproved!"
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