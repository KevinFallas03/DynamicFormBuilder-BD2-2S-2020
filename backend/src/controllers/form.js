const Form = require("../models/form");
const Approval = require("../models/Approval");
const Template = require('../models/template');
const template = require("../models/template");

const formController = {};


formController.get = async (req, res) => {
    try {
        const FormsbyUserId = await Form.find();
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
    var userId  = req.params.id;
    try {
        const formsbyUserId = await Form.find({ applicant:userId });
        res.status(202).send(formsbyUserId);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'the request failed', 
              error: err
            }
        );
    }   
}
formController.getAll = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(202).send(forms);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'the request failed', 
              error: err
            }
        );
    }   
}
formController.getById = async (req, res) => {
    const { id } = req.params;

    try {

        const aprovalsOfUser = await Form.findById(id);

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
formController.getPending = async (req, res) => {
    var {id} =  req.params;
    

    var infoCompleta = JSON.parse(id)


    var templateList = infoCompleta.map( e => e.template)

    console.log(templateList)
    try {
        const aprovalsOfUser = await Form.find( { template: { $in: templateList } } )//.populate('applicant'); usar despues
        console.log(aprovalsOfUser)
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

formController.edit = async (req, res) => {
    var {info} =  req.params;
    console.log(info)
    var approvalInfo = JSON.parse(info)

    console.log(approvalInfo)

    var data = {}
    data.user = approvalInfo.userId
    data.approved = approvalInfo.approved

    console.log("viene data")
    console.log(data)
    try { 
        const updatedApproval = await Form.updateOne({ _id: approvalInfo.formId }, { $addToSet: { approvers: [data] }});
        res.status(202).send(updatedApproval);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'Approval edition failed', 
              error: err
            }
        );
    }   

    // aca 

    
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

formController.delete = async (req, res) => {
    res.json({
        message: "Hello from delete!"
    });
};

module.exports = formController;