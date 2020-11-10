const Template = require('../models/template');
const User = require('../models/User');

const templateController = {};

templateController.get = async (req, res) => {
    try{
        const templates = await Template.find();
        res.json(templates);
    }
    catch(error){
        res.json({message: error});
    }
};

templateController.create = async (req, res) => {
    console.log("Hola");
    /*
    const template = new Template(
        {
            "name": req.body.schema.title
        });
    try{
        const savedTemplate = await template.save();
        res.json(savedTemplate);
    } catch(error){
        res.json({message: error});
    }*/
    res.json(req.body);
};

templateController.edit = async (req, res) => {
};

templateController.delete = async (req, res) => {
};

module.exports = templateController;