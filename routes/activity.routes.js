const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Obtenir totes les destinacions d'un viatge
router.get('/travel/:travelId', authMiddleware, activityController.getActivitiesByTravel);

// Afegir una nova destinació
router.post('/', authMiddleware, activityController.addActivity);

// Update destinació
router.put('/:id', authMiddleware, activityController.updateActivity);

// Eliminar una destinació
router.delete('/:id', authMiddleware, activityController.deleteActivity);

module.exports = router;