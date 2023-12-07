const express = require("express");
const router = express.Router();
const mixpanelLogger = require("../middlewares/mixpanelLogger"); // Assuming the path is correct
const mixpanelController = require("../controllers/MixpanelEventController"); // Assuming the path is correct

// Route for adding a new Mixpanel Event
router.post(
  "/addMixpanelEvent",
  mixpanelLogger,
  mixpanelController.addMixpanelEvent
);

// Route for adding a new Mixpanel Event
router.post("/testAddMixpanelEvent", mixpanelController.testAddExtensionEvents);

// Send an event to Mixpanel when user is disable our extension
router.get(
  "/uninstall/:extensionId",
  mixpanelController.sendEventAfterUninstall
);

// Route for adding a new Mixpanel Event
router.post("/addExtensionEvents", mixpanelController.addExtensionEvents);

module.exports = router;
