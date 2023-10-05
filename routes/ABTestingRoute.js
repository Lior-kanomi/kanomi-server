const express = require("express");
const router = express.Router();
const ABTestingController = require("../controllers/ABTestingController");

router.get("/getABTestingGroup", ABTestingController.getABTestingGroup);

router.post("/createABTestingGroup", ABTestingController.createABTestingGroup);

router.put("/updateStatsField", ABTestingController.addStatsField);

router.put("/updateGroupeField", ABTestingController.updateGroupeField);

// Exports the router to be used in the main application
module.exports = router;
