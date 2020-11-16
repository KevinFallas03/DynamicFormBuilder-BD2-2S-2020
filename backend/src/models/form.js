const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({

    template: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Templates'
    },
    name: String,
    description: String,
    applicant: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approvers: [{ 
        user : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        approved : Boolean  // {user: ass,approved : 0},{}
    }],
    responses: [{
        label: String,
        value: String,
        values: [],
        type:{type:String},
        required:Boolean 
    }],
    status:{
        type: String,
        default: "Pendiente"
    }
  },{timestamps: true}
);

module.exports = mongoose.model("Forms", formSchema);