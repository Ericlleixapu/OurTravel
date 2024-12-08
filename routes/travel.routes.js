const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Ruta per crear un nou viatge
router.post('/', authMiddleware, travelController.createTravel);

// Ruta per obtenir tots els viatges d'un usuari autenticat
router.get('/', authMiddleware, travelController.getAllTravels);
// Ruta per obtenir tots els viatges d'un usuari autenticat
router.get('/:id', authMiddleware, travelController.getTravelById);

router.put('/addMember/:travelId', authMiddleware, travelController.addMemberToTravel);

router.put('/removeMember/:travelId', authMiddleware, travelController.removeMemberToTravel);

// Ruta per obtenir tots els viatges d'un usuari autenticat
router.delete('/:travelId', authMiddleware, travelController.removeTravel);

module.exports = router;