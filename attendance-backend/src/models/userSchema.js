const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
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
    profile: {
        avatar: {
            type:String,
            default: 'https://www.w3schools.com/w3images/avatar2.png'
        }
    },
    role: {
        type:[String],
        enum: ['user','admin'],
        default: () => ['user']
    },
})

const User = mongoose.model('user',userSchema);

module.exports = User;