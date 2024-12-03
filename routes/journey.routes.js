const express = require('express');
const router = express.Router();
const journeyController = require('../controllers/journey.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Obtenir totes les destinacions d'un viatge
router.get('/travel/:travelId', authMiddleware, journeyController.getJourneysByTravel);

// Afegir una nova destinació
router.post('/', authMiddleware, journeyController.addJourney);

// Update destinació
router.put('/:id', authMiddleware, journeyController.updateJourney);

// Eliminar una destinació
router.delete('/:id', authMiddleware, journeyController.deleteJourney);

module.exports = router;