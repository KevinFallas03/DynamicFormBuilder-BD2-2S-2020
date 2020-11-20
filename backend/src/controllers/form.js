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
        const formsbyUserId = await Form.find({ applicant:userId,status:'Pendiente' })
        .populate({'path':"approvers.user", "select":"username"});
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
        console.log("Si es este")
        const aprovalsOfUser = await Form.findById(id).populate({'path':"approvers.user", "select":["firstName","lastName"]});
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
    var routesList = infoCompleta.map( e => e._id)
   
    try {
        const isApprovedAlready = await Form.find({
        $and : 
            [ 
                { 'approvers.user' : {$nin : user.userId}},
                { status : 'Pendiente'},
                { routes : {$in : routesList }}  
            ]
        })
        
        res.status(202).send(isApprovedAlready);

    } catch (err) {
        res.status(500).json(
            { 
              message : 'the request failed', 
              error: err
            }
        );
    }   
};

formController.getApprovedByMe = async (req, res) => {
    var {id} =  req.params;
    try {
        const aprovalsOfUser = await Form.find( {'approvers.user' : id , 'approvers.approved' : true} )
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

formController.getDenegatedByMe = async (req, res) => {
    var {id} =  req.params;
    try {
       const aprovalsOfUser = await Form.find( {'approvers.user' : id , 'approvers.approved' : false} )
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


formController.getApproved = async (req, res) => {
    var {id} =  req.params;

    try {
        const aprovalsOfUser = await Form.find( {'applicant' : id , 'status' : "Aprobado"} )
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

formController.getDenegated = async (req, res) => {
    var {id} =  req.params;
    
    try {
        const aprovalsOfUser = await Form.find( {'applicant' : id , 'status' : "Denegado"} )
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

formController.edit = async (req, res) => {
    var {info} =  req.params;
    var approvalInfo = JSON.parse(info)

    // se puede usar el shift pero validar el id
    var data = {}
    data._id = approvalInfo[0].userId
    data.user = approvalInfo[0].userId
    data.approved = approvalInfo[0].approved

   
    try { 
        // Se añade el aprobador en la lista con el booleano true or false
        const updatedApproval = await Form.updateOne({ _id: approvalInfo[0].formId }, { $addToSet: { approvers: [data] }});

        // Se saca el form actual, con los aprobadores actualizados
        const actualForm = await Form.findOne({ _id: approvalInfo[0].formId })

        // se obtiene el minimo de aprobadores necesarios para ese template
        var min = 0
        var total = 0
        approvalInfo.forEach(e => {
            if(e.template == actualForm.template){
                total=  Object.keys(e.approvers).length
                min = e.minimumApprovalAmount
            }
         });

        // obtiene el numero de personas que le dieron positivo al form
        var numApprovers = 0
        actualForm.approvers.forEach(e => {
            if(e.approved){
                numApprovers++;
            }
         });
        
        var count = Object.keys(actualForm.approvers).length

        if(numApprovers >= min)
            {
                const changeStatus = await Form.updateOne({ _id: approvalInfo[0].formId }, { status: "Aprobado"});
                res.status(202).send(updatedApproval);
            }
        else if(count == total)
        {
            // Cambia el estado si logra llegar al minimo o mas
            const changeStatus = await Form.updateOne({ _id: approvalInfo[0].formId }, { status: "Denegado"});
            res.status(202).send(updatedApproval);
        }
        
    } catch (err) {
        res.status(500).json(
            { 
              message : 'Approval edition failed', 
              error: err
            }
        );
    }   

    // aca hay que cambiar 

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