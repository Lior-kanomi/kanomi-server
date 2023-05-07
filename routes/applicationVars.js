const express = require("express");
const router = express.Router();

// Route for adding a new button
router.get("/getApplicationVars", (req, res) => {
  res.status(200).json({ message: "success" });
});

// Exports the router to be used in the main application
module.exports = router;
