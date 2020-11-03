/**
 * User schema, used to represent accounts on the system.
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            require: true
        }
    },
    {
        versionKey: false, 
        timestamps: true, // createdAt and updatedAt 
    }
);

module.exports = mongoose.model("User", UserSchema);