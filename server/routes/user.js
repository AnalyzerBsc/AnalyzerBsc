const path = require('path');
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();


router.get('/search/:searchTerm', userController.getplate);

router.get('/frames/:frameNumber', userController.getFrameContent);

module.exports = router;
