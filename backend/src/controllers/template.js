const Template = require('../models/template');
const User = require('../models/User');
const { param } = require('../routes/template');

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

templateController.getManyById = async (req, res) => {
    const { ids } = req.params;
    var jsonIds = JSON.parse(ids);
    try{
        const templates = await Template.find( { '_id' : { $in : jsonIds.data } } );
        res.json(templates);
    }
    catch(error){
        res.json({message: error});
    }
};
templateController.getById = async (req, res) => {
    try{
        const templates = await Template.findById(req.params.id);
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
    //const template = new Template(req, res);
    try{
        const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updatedTemplate);
    } catch(error){
        res.json({message: error});
    }
};

templateController.delete = async (req, res) => {
    try{
        const templates = await Template.deleteOne({_id: req.params.id});
        res.json(templates);
    }
    catch(error){
        res.json({message: error});
    }
};

module.exports = templateController;