const express = require("express");
const router = express.Router();
const ABTestingController = require("../controllers/ABTestingController");

// Route for adding a new button
router.get("/getABTestingGroup", ABTestingController.getABTestingGroup);

// Route for adding a new button
router.post("/createABTestingGroup", ABTestingController.createABTestingGroup);

// Exports the router to be used in the main application
module.exports = router;
