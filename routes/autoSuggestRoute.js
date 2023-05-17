const express = require("express");
const router = express.Router();
const SuggestController = require("../controllers/SuggestController");

// Route for adding a new button
router.get("/getUserSuggestions/:query", SuggestController.getUserSuggestions);
router.get("/getTrendsData", SuggestController.getTrendsData);

// Exports the router to be used in the main application
module.exports = router;
