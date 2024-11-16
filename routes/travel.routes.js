const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Ruta per crear un nou viatge
router.post('/', authMiddleware, travelController.createTravel);

// Ruta per obtenir tots els viatges d'un usuari autenticat
router.get('/', authMiddleware, travelController.getAllTravels);

// Ruta per obtenir tots els viatges d'un usuari autenticat
router.delete('/:travelId', authMiddleware, travelController.removeTravel);

// Ruta per afegir una destinació a un viatge
router.post('/:travelId/destination', authMiddleware, travelController.addDestination);

// Ruta per afegir una activitat a un viatge
router.post('/:travelId/activity', authMiddleware, travelController.addActivity);

module.exports = router;