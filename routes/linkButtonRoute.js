const express = require("express");
const router = express.Router();
const buttonController = require("../controllers/LinkButtonController");

// Route for adding a new button
router.post("/addButton", buttonController.createButton);

// Route for retrieving the link of a button based on its name
router.get("/getLink/:buttonName", buttonController.getLink);

// Route for updating button's details
router.put("/updateButtons", buttonController.updateButtons);

// Route for retrieving the link of a button based on its name
router.get("/getLinksButtons", buttonController.getLinks);

// Exports the router to be used in the main application
module.exports = router;
