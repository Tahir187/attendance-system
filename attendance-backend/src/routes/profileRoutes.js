const express = require('express');
const { uploadProfilePicture } = require('../controllers/admin_Controller');
const upload = require('../config/upload');

const router = express.Router();

router.post('/upload',upload.single('profile'), uploadProfilePicture);

module.exports = router;    