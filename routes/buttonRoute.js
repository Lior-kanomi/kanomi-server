const express = require("express");
const router = express.Router();
const buttonController = require("../controllers/ButtonController");

router.post("/addButton", buttonController.createButton);
router.get("/getLink/:buttonName", buttonController.getLink);
router.get("/getImage/:buttonName", buttonController.getIcon);

module.exports = router;
