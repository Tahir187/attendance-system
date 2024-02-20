const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role:{
        type: String,
        default: "Admin"
    }
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;