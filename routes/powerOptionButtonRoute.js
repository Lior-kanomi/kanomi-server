const express = require("express");
const router = express.Router();
const powerButtonController = require("../controllers/PowerButtonController");

// Route for adding a new button
router.post(
  "/addPowerOptionButton",
  powerButtonController.createPowerOptionButton
);

// Route for updating a new button
router.post("/update", powerButtonController.removeButtonSuffix);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
