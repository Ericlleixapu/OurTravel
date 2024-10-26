const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta per registrar-se
router.post('/register', authController.register);

// Ruta per iniciar sessió
router.post('/login', authController.login);

module.exports = router;