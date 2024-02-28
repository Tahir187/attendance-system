const User = require('../models/userSchema'); 
const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find(); 
      res.json({ users }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = UserController;
