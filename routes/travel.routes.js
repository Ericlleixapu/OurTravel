const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travel.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.get('/public', travelController.getAllPublicTravels);
router.get('/public/:id', travelController.getPublicTravelById);
router.get('/publicByUser', authMiddleware,travelController.getPublicTravelByUser);
router.get('/publicByCountry/:country', travelController.getPublicTravelByCountry);
router.put('/public/addFollower/:travelId', authMiddleware,travelController.addFollowerToTravel);
router.put('/public/removeFollower/:travelId', authMiddleware,travelController.removeFollowerToTravel);
router.put('/changeVisibility/:travelId', authMiddleware, travelController.changeVisibility);

router.get('/:id', authMiddleware, travelController.getTravelById);
router.get('/', authMiddleware, travelController.getAllTravels);
router.post('/', authMiddleware, travelController.createTravel);
router.delete('/:travelId', authMiddleware, travelController.removeTravel);

router.put('/addMember/:travelId', authMiddleware, travelController.addMemberToTravel);
router.put('/removeMember/:travelId', authMiddleware, travelController.removeMemberToTravel);

module.exports = router;