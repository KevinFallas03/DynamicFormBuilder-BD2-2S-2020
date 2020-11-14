const Form = require("../models/form");

const formController = {};

formController.get = async (req, res) => {
    res.json({
        message: "Hello from get!"
    });
};

formController.create = async (req, res) => {
    const form = new Form(req.body);
    try{
        const savedForm = await form.save();
        res.json(savedForm);
    } catch(error){
        res.json({message: error});
    }
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