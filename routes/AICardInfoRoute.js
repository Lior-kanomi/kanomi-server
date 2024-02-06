const express = require("express");
const router = express.Router();
const AICardInfoController = require("../controllers/AICardInfoController");

// Route for adding a new button
router.post("/addAICardInfo", AICardInfoController.createAICardInfo);
// Route for getting AI card info
router.get("/getAICardsInfo", AICardInfoController.getAICardsInfo);
// Exports the router to be used in the main application
module.exports = router;
