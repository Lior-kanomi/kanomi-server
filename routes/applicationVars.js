const express = require("express");
const router = express.Router();
const applicationVarsController = require("../controllers/ApplicationVarsController");

// Route for adding a new button
router.post(
  "/createApplicationVars",
  applicationVarsController.createApplicationVar
);

router.get("/getApplicationVars", applicationVarsController.getApplicationVars);

// Exports the router to be used in the main application
module.exports = router;
