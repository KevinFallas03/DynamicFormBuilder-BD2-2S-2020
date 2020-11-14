const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({

    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Templates'
    },
    applicant: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvers: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    responses: [{
        itemName: String,
        type: String,
        response: String
    }],
    status:{
        type: String,
        default: "Pendiente"
    }
  },{timestamps: true}
);

module.exports = mongoose.model("Forms", formSchema);