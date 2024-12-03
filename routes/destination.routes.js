const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destination.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Obtenir totes les destinacions d'un viatge
router.get('/travel/:travelId', authMiddleware, destinationController.getDestinationsByTravel);

// Afegir una nova destinació
router.post('/', authMiddleware, destinationController.addDestination);

// Update destinació
router.put('/:id', authMiddleware, destinationController.updateDestination);

// Eliminar una destinació
router.delete('/:id', authMiddleware, destinationController.deleteDestination);

module.exports = router;