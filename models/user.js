const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    versionKey: false,
    timestamps: true
})

const User = mongoose.model('users', userSchema)

module.exports = User