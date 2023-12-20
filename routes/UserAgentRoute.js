const express = require("express");
const router = express.Router();
const UserAgentController = require("../controllers/UserAgentController");

// Route for getting a Chrome Versions
router.get("/getChromeVersions", UserAgentController.getChromeVersions);

router.get("/getChromeVersion", UserAgentController.getChromeVersionForUser);

router.get("/getChromeVersionTimer", UserAgentController.getChromeVersionTimer);

router.post("/addStatsField", UserAgentController.addStatsField);

// Route for getting a FeedUrl
router.post("/createChromeVersion", UserAgentController.createChromeVersion);

// Route for getting a FeedUrl
router.delete("/deleteUserAgent", UserAgentController.deleteUserAgentDoc);

// Exports the router to be used in the main application
module.exports = router;
