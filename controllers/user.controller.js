const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Error fetching user profile", error });
    }
};

exports.searchUsers = async (req, res) => {
    const { query } = req.params;

    try {
      const users = await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { surname: { $regex: query, $options: 'i' } },
          { alias: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      }).select('-email -password');
  
      if (users.length == 0) {
        return res.status(404).json({ message: 'No Users found.' });
      }
      res.status(200).json(users);
    } catch (error) {
      console.error('Error buscando usuarios:', error.message);
      res.status(500).json({ message: 'Error buscando usuarios', error });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { user } = req.body;            
        user.updatedAt = Date.now();        
        const updatedUser = await User.findByIdAndUpdate(req.userId, user, { new: true }).select('-password');    
        res.status(200).send( updatedUser );
    } catch (error) {
        res.status(500).send({ message: "Error updating profile", error });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;      
        const user = await User.findById(req.userId);
        
        let updatedUser;
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (isMatch) {
            user.password = await hashPassword(newPassword);     
            user.updatedAt = Date.now();        
            updatedUser = await User.findByIdAndUpdate(req.userId, user, { new: true }).select('-password');
        } else {
            return res.status(401).send({ message: "Password incorrecte." });    
        }
        
        res.status(200).send(updatedUser );
    } catch (error) {
        res.status(500).send({ message: "Error al modificar el password.", error });
    }
};
