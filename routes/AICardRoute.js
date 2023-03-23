const express = require("express");
const router = express.Router();
const AICardController = require("../controllers/AICardController");
// Route for adding a new button
router.post("/addAICard", AICardController.createAICard);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
