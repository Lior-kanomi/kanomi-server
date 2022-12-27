const express = require('express');
const router = express.Router();
const buttonController = require('../controllers/ButtonController');

router.post('/addButton', buttonController.createButton);
router.get('/getLink', buttonController.getLink);





module.exports = router;
