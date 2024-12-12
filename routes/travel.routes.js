const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, travelController.getAllTravels);
router.get('/:id', authMiddleware, travelController.getTravelById);
router.post('/', authMiddleware, travelController.createTravel);
router.delete('/:travelId', authMiddleware, travelController.removeTravel);

router.put('/addMember/:travelId', authMiddleware, travelController.addMemberToTravel);
router.put('/removeMember/:travelId', authMiddleware, travelController.removeMemberToTravel);

router.get('/public', travelController.getAllPublicTravels);
router.get('/public/:id', travelController.getPublicTravelById);
router.put('/public/:travelId', travelController.addFollowerToTravel);
router.put('/changeVisibility/:travelId', authMiddleware, travelController.changeVisibility);

module.exports = router;