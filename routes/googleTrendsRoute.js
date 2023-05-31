const express = require("express");
const router = express.Router();
const GoogleTrendsController = require("../controllers/GoogleTrendsController");
// Route for adding a new button
router.get("/getGoogleTrends", GoogleTrendsController.getGoogleTrends);

// Exports the router to be used in the main application
module.exports = router;
