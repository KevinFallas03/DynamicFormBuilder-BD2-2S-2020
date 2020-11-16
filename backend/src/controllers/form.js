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

    var user =infoCompleta.shift();
    var templateList = infoCompleta.map( e => e.template)

    // 'approvers.user' : user.userId
    try {
       const aprovalsOfUser = await Form.find( { template: { $in: templateList } }  )
       
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
    //console.log(info)
    var approvalInfo = JSON.parse(info)

    var data = {}
    data.user = approvalInfo[0].userId
    data.approved = approvalInfo[0].approved

  //  approvalInfo.shift()

    console.log("data")
    console.log(data)

    console.log(approvalInfo[0].formId)
   
    try { 
        // tengo que vaildar si ya esta adentro

        const verForm = await Form.find({ _id: approvalInfo[0].formId })

        console.log("Form")
        console.log(verForm[0].approvers)

        //const updatedApproval = await Form.updateOne({ _id: approvalInfo[0].formId }, { $addToSet: { approvers: data }});
      
        
        
        //res.status(202).send(updatedApproval);
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