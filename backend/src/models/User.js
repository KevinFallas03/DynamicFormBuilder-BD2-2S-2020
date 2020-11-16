/*
 * User schema, used to represent accounts on the system.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

require('dotenv/config');

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        secondName: {
            type: String
        },
        lastName: {
            type: String,
            required: true
        },
        secondLastName: {
            type: String
        },
        username: { 
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true   
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
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


/* ==================
    Security Methods
   ================== */

// Encrypts the password before saving it in the database
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') && user.password != "") {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})


// Generates an authentication token
UserSchema.methods.generateToken = async function () {
    const user = this;
    const generatedToken = jwt.sign({_id: user._id}, process.env.TOKEN_KEY);

    user.tokens = user.tokens.concat({token: generatedToken});
    
    await user.save();
    return generatedToken;
}


// Finds a specific user based on email AND password
UserSchema.statics.getFromCredentials = async (user, password) => {
    const foundUser = await User.findOne({username: user});

    if (!user) {
        throw new Error({error: "Invalid credentials."});
    }
    const samePassword = await bcrypt.compare(password, foundUser.password);
    
    if (!samePassword) {
        throw new Error({error: "Invalid credentials."});
    }
    
    return foundUser
}

const User = mongoose.model("User", UserSchema)
module.exports = User;