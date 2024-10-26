const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Ruta per obtenir el perfil de l'usuari autenticat
router.get('/profile', authMiddleware, userController.getProfile);

// Ruta per modificar el perfil de l'usuari autenticat
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router;