const express = require("express");
const router = express.Router();
const buttonController = require("../controllers/LinkButtonController");

// Route for adding a new button
router.post("/addButton", buttonController.createButton);

// Route for retrieving the link of a button based on its name
router.get("/getLink/:buttonName", buttonController.getLink);

// Route for updating a button's details
router.post("/updateButton/:buttonName", buttonController.updateButton);

// Route for getting the icon of a button based on its name
router.get("/getImage/:buttonName", buttonController.getIcon);

// Route for retrieving the link of a button based on its name
router.get("/getLinks", buttonController.getLinks);

// Exports the router to be used in the main application
module.exports = router;
