const mongoose = require("mongoose");
const { Schema } = mongoose;

const approvalSchema = new Schema(
  {
    authors : [
    { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
    ],
    approvers :[
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
    ],
    template: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Templates',
        required : true
    },

    // TODO: discuss about the mininum amount of people to approve a form (how, defining people? amount? both?)
    minimumApprovalAmount : {
        type : Number,
        required : true
    },
  },
  {
    versionKey : false, 
    timestamps : true
  }
);

module.exports = mongoose.model("Approvals", approvalSchema);