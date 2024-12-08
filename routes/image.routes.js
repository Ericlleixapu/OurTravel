const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const imageController = require('../controllers/images.controller');

router.get('/travel/:travelId', authMiddleware, imageController.getImagesByTravel);
router.post('/', authMiddleware, imageController.addImage);
router.put('/:id', authMiddleware, imageController.updateImage);
router.delete('/:id', authMiddleware, imageController.deleteImage);

module.exports = router;
