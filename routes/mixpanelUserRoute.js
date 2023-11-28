const express = require("express");
const router = express.Router();
const mixpanelLogger = require("../middlewares/mixpanelLogger"); // Assuming the path is correct
const mixpanelController = require("../controllers/MixpanelEventController"); // Assuming the path is correct

// Route for adding a new Mixpanel Event
router.post(
  "/addMixpanelUser",
  mixpanelLogger,
  mixpanelController.addMixpanelUser
);

// Route for adding a new Mixpanel Event
router.post("/addExtensionEvents", mixpanelController.addExtensionEvents);

module.exports = router;
