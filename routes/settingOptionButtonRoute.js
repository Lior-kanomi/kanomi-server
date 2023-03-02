const express = require("express");
const router = express.Router();
const settingButtonController = require("../controllers/SettingButtonController");

// Route for adding a new button
router.post(
  "/addSettingOptionButton",
  settingButtonController.createSettingOptionButton
);

// Route for updating a new button
router.get("/update", settingButtonController.removeButtonSuffix);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
