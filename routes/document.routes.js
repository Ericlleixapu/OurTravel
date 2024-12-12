const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const documentController = require('../controllers/documents.controller');

router.get('/travel/:travelId', authMiddleware, documentController.getDocumentsByTravel);
router.post('/', authMiddleware, documentController.addDocument);
router.put('/:id', authMiddleware, documentController.updateDocument);
router.delete('/:id', authMiddleware, documentController.deleteDocument);

module.exports = router;
