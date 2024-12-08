const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Ruta per obtenir el perfil de l'usuari autenticat
router.get('/profile', authMiddleware, userController.getProfile);

// Ruta per obtenir el perfil de l'usuari autenticat
router.get('/search/:query', authMiddleware, userController.searchUsers);

// Ruta per modificar el perfil de l'usuari autenticat
router.put('/profile', authMiddleware, userController.updateProfile);

// Ruta per modificar el password de l'usuari autenticat
router.put('/password', authMiddleware, userController.changePassword);

module.exports = router;