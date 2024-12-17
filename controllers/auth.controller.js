const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
};

exports.register = async (req, res) => {
    try {
        const user = new User(req.body);
        let size = await User.countDocuments({});
        user.alias = 'User' + Math.round(Math.random() * size * 100);
        user.password = await hashPassword(user.password);

        await user.save();
        res.status(201).send({ ok: true, message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error registering user", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiration });
            res.status(200).send({ ok: true, message: "Login successful", token });
        } else {
            return res.status(401).send({ message: "Invalid credentials" });
        }

    } catch (error) {
        res.status(500).send({ message: "Error logging in", error });
    }
};
