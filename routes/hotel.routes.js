const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació

// Obtenir totes les destinacions d'un viatge
router.get('/travel/:travelId', authMiddleware, hotelController.getHotelsByTravel);

// Afegir una nova destinació
router.post('/', authMiddleware, hotelController.addHotel);

// Update destinació
router.put('/:id', authMiddleware, hotelController.updateHotel);

// Eliminar una destinació
router.delete('/:id', authMiddleware, hotelController.deleteHotel);

module.exports = router;