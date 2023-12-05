const express = require("express");
const router = express.Router();
const FeedUrlController = require("../controllers/FeedUrlController");

// Route for getting a FeedUrl
router.get("/getFeedUrlWithParams/:query/:userId", FeedUrlController.testUserIdFeedUrl);

// Route for getting a FeedUrl
router.get("/getFeedUrl/:query", FeedUrlController.getFeedUrl);

// Route for getting a FeedUrl
router.post("/createFeedUrl", FeedUrlController.createFeedUrl);

// Exports the router to be used in the main application
module.exports = router;
