const mongoose = require('mongoose');

//Create User Schema
const userSchema = mongoose.Schema(
    { //Database properties
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
        },
        userRole: {
            type: String,
            enum: [
                "admin",
                "tutor",
                "student",
                "not assigned"
            ],
            default: "not assigned"
        },
        isTutor: {
            type: Boolean,
            default: 0
        },
        isAdmin: {
            type: Boolean,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

modules.exports = mongoose.model("User", userSchema)