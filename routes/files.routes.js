const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const filesController = require('../controllers/files.controller');

var multer = require("multer")
const path = require('path');
var profileImageStorage = multer.diskStorage(
    {
        destination: './uploads/profileImages',
        filename: function ( req, file, cb ) {
            cb( null, Date.now()+ path.extname(file.originalname).toLowerCase());
        }
    }
);
var profileImages = multer({ storage: profileImageStorage });

var travelImageStorage = multer.diskStorage(
    {
        destination: './uploads/images',
        filename: function ( req, file, cb ) {
            cb( null, Date.now()+ path.extname(file.originalname).toLowerCase());
        }
    }
);
var travelImages = multer({ storage: travelImageStorage });

var travelDocumentStorage = multer.diskStorage(
    {
        destination: './uploads/documents',
        filename: function ( req, file, cb ) {
            cb( null, Date.now()+ path.extname(file.originalname).toLowerCase());
        }
    }
);
var travelDocuments = multer({ storage: travelDocumentStorage });

router.post('/profileImage', profileImages.single('profileImage'), authMiddleware, filesController.uploadProfileImage);
router.post('/travelImage', travelImages.single('travelImage'), authMiddleware, filesController.uploadTravelImage);
router.get('/travelImage/:travelImage', authMiddleware,filesController.getTravelImage);
router.post('/travelDocument', travelDocuments.single('travelDocument'), authMiddleware, filesController.uploadTravelDocument);
router.get('/travelDocument/:travelDocument', authMiddleware,filesController.getTravelDocument);
router.get('/profileImage/:profileImage', filesController.getProfileImage);
router.get('/destinationImage/:destinationImage', filesController.getDestinationImage);

module.exports = router;