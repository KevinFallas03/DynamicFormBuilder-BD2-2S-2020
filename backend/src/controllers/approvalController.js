const Approval = require("../models/Approval");

const approvalController = {};

approvalController.get = async (req, res) => {
    res.json({ message: "Hello from get!" });
};

approvalController.edit = async (req, res) => {
    res.json({ message: "Hello from edit!" });
};

/**
 * Create a new approval route for a form
 * @param {*} req.body with the needed fiels
 * @param {*} res 
 */
approvalController.create = async (req, res) => {
    const newApproval = { authors, approvers, template, minimumApprovalAmount } = req.body;
    try {
        const createdApproval = await Approval.insert(newApproval);
        res.status(202).send(createdApproval);
    } catch (err) {
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