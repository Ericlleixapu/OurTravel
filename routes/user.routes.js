const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació


// Ruta per obtenir el perfil d'un usuari concret'
router.get('/:userId', authMiddleware, userController.getProfile);

// Ruta per obtenir una llista d'usuaris segons el nom'
router.get('/byUsername/:username', authMiddleware, userController.getProfile);

// Ruta per obtenir el perfil de l'usuari autenticat
router.get('/profile', authMiddleware, userController.getProfile);

// Ruta per modificar el perfil de l'usuari autenticat
router.put('/profile', authMiddleware, userController.updateProfile);

// Ruta per modificar el password de l'usuari autenticat
router.put('/password', authMiddleware, userController.changePassword);

module.exports = router;