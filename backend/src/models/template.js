const mongoose = require("mongoose");
const { Schema } = mongoose;

const templateSchema = new Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: false
    },
    items: [{
        name: String,
        type: String,
        optional: Boolean,
        options: [{
            name: String,
            type: String
        }]
    }],
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
  },{timestamps: true}
);

module.exports = mongoose.model("Templates", templateSchema);