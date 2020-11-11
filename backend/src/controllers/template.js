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
    const template = new Template(req.body);
    try{
        const savedTemplate = await template.save();
        res.json(savedTemplate);
    } catch(error){
        res.json({message: error});
    }
};

templateController.edit = async (req, res) => {
};

templateController.delete = async (req, res) => {
    try{
        const templates = await Template.deleteMany({},callback);
        res.json(templates);
    }
    catch(error){
        res.json({message: error});
    }
};

module.exports = templateController;