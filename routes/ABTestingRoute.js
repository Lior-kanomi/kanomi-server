const express = require("express");
const router = express.Router();
const ABTestingController = require("../controllers/ABTestingController");

// Staging environment.
router.get("/getABTestingGroups", ABTestingController.getABTestingGroups); // -> for the new version
router.get("/checkGroups", ABTestingController.updateGroups); // -> for the new version

// Production environment.
router.get("/checkGroupField", ABTestingController.updateGroupField);
router.get("/getABTestingGroup", ABTestingController.getABTestingGroup);
router.post("/createABTestingGroup", ABTestingController.createABTestingGroup);
router.put("/updateStatsField", ABTestingController.addStatsField);

// Exports the router to be used in the main application
module.exports = router;
