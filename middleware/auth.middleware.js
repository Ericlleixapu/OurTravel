const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

const authMiddleware = (req, res, next) => {
    // Agafa el token des de l'encapçalament d'autorització
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    // Verifica el token
    jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        // Assigna l'ID de l'usuari al req.userId
        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;