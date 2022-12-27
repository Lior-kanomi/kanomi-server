const express = require('express');
const router = express.Router();
const buttonController = require('../controllers/ButtonController');

router.get('/buttons/addButton/:buttonName', buttonController.createButton);


module.exports = router;
