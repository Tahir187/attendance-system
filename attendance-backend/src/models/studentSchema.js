const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollNum:{
        type: Number,
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
        default: "Student"
    },
    attendace:[{
        date:{
            type: Date,
            required: true,
        },
        status:{
            type: String,
            enum: ['Present', 'Absent', 'Leave'],
            required: true,
        },
    }]
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;