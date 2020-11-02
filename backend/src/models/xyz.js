
/**
 * MODEL EXAMPLE
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const xyzSchema = new Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    position: {
        type: String,
        required: true 
    },
    office: {
        type: String, 
        required: true 
    },
    salary: {
        type: Number, 
        required: true 
    },
  },
  {
    versionKey: false, 
    timestamps: true, // createdAt and updatedAt 
  }
);

module.exports = mongoose.model("Xyz", xyzSchema);