const express = require("express");
const router = express.Router();
const UserAgentController = require("../controllers/UserAgentController");

// Route for getting a FeedUrl
router.get("/getChromeVersions", UserAgentController.getChromeVersions);

// Route for getting a FeedUrl
router.post("/createChromeVersion", UserAgentController.createChromeVersion);

// Exports the router to be used in the main application
module.exports = router;
