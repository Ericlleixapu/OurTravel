const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: "Error fetching user profile", error });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;        
        const user = await User.findByIdAndUpdate(req.userId, { name, email }, { new: true }).select('-password');
        
        res.status(200).send({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).send({ message: "Error updating profile", error });
    }
};