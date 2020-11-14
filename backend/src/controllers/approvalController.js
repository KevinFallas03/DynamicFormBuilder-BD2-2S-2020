const Approval = require("../models/Approval");

const approvalController = {};

/**
 * Get the approvals binded to a specific templat
 * @param {*} req.params.templateName template name to filter
 * @param {*} res 
 */
approvalController.get = async (req, res) => {
    const { id } = req.params;
    try {
        const approvalByTemplateName = await Approval.find({template:{_id:id}});
        res.status(202).send(approvalByTemplateName);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'Approval get request failed', 
              error: err
            }
        );
    }   
};


/**
 * Get the approvals binded to a specific user
 * @param {*} req.params.templateName template name to filter
 * @param {*} res 
 */
approvalController.getPending = async (req, res) => {
    const { id } = req.params;

    try {
        const aprovalsOfUser = await Approval.find({approvers : id},{template : 1});
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

/**
 * Modify an approval object with the given object using the id
 * @param {*} req.body approval json object to edit
 * @param {*} res 
 */
approvalController.edit = async (req, res) => {
    const editedApproval = req.body;
    try {
        const updatedApproval = await Approval.findByIdAndUpdate( editedApproval._id, editedApproval );
        res.status(202).send(updatedApproval);
    } catch (err) {
        res.status(500).json(
            { 
              message : 'Approval edition failed', 
              error: err
            }
        );
    }   
};

/**
 * Create a new approval route for a form
 * @param {*} req.body with the needed fiels
 * @param {*} res 
 */
approvalController.create = async (req, res) => {
    const newApproval = req.body;
    try {
        const createdApproval = await Approval.insertMany([newApproval]);
        res.status(202).send(createdApproval);
    } catch (err) {
        console.log(err);
        res.status(500).json(
            { 
              message : 'Approval creation failed', 
              error: err
            }
        );
    }
};

/**
 * Delete an approval with the given id
 * @param {*} req.params.approvalId to identify the approval to delete
 * @param {*} res 
 */
approvalController.delete = async (req, res) => {
    const { approvalId } = req.params;
    try {
        const deletedApproval = await Approval.findByIdAndDelete( approvalId );
        res.status(202).send(deletedApproval);
    } catch(err) {
        res.status(500).json(
            { 
              message : 'Approval deletion failed', 
              error: err
            }
        );
    }
};

module.exports = approvalController;