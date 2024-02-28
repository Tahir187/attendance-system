const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const isAuthorizedUser = (role) => {
    return (req, res, next) => {
        console.log(!role.includes('admin'));
        if(!(role.includes('admin'))){
            return res.status(403).json({message: `${req.user.email} do not have permission for this operation`})
        }
        next();
    }
}

module.exports = {isAuthorizedUser};