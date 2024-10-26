const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = new User({ email, password, name });
        
        await user.save();
        res.status(201).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error registering user", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || password != user.password) {
            return res.status(401).send({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiration });
        res.status(200).send({ message: "Login successful", token });
    } catch (error) {
        res.status(500).send({ message: "Error logging in", error });
    }
};