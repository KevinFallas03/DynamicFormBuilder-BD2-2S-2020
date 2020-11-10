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
    type: String,
    items: [{
        type: String,
        key: String,
        description: String,
        required: Boolean,
        placeholder: String,
        multiple: Boolean,
        format: String,
        properties: [{
            name: String,
            type: String
        }],
        feeding_type: String,
        external_feeding_config: {
            endpoint: String,
            value_property: String,
            text_property: String
        },
        default: String,
        triggers: String
    }],
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    availableFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
  },{timestamps: true}
);

module.exports = mongoose.model("Templates", templateSchema);