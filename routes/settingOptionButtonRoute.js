const express = require("express");
const router = express.Router();
const settingButtonController = require("../controllers/SettingButtonController");

// Route for adding a new button
router.post(
  "/addSettingOptionButton",
  settingButtonController.createSettingOptionButton
);

router.put(
  "/updateSettingOptionButton",
  settingButtonController.updateSettingOptionButton
);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
