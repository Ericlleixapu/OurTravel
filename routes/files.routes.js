const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware'); // Middleware d'autenticació
const filesController = require('../controllers/files.controller');

var multer = require("multer")
const path = require('path');
var storage = multer.diskStorage(
    {
        destination: './uploads/profileImages',
        filename: function ( req, file, cb ) {
            cb( null, Date.now()+ path.extname(file.originalname).toLowerCase());
        }
    }
);
var upload = multer({ storage: storage });

router.post('/profileImage', upload.single('profileImage'), authMiddleware, filesController.uploadProfileImage);
router.get('/profileImage/:profileImage', filesController.getProfileImage);




module.exports = router;