const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authMiddleware = async(req, res, next) =>{
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication failed! No token provided.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists in the database
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found!' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed! Invalid token.' });
    }
}
module.exports = authMiddleware;