const express = require("express");
const router = express.Router();
const mixpanelController = require("../controllers/MixpanelEventController"); // Assuming the path is correct

// Route for adding a new Mixpanel Event
router.post(
  "/addMixpanelUser",
  mixpanelController.addMixpanelUser
);

// Route for adding a new Mixpanel Event
router.post("/addExtensionEvents", mixpanelController.addExtensionEvents);

module.exports = router;
