const express = require("express");
const router = express.Router();
const nativeButtonController = require("../controllers/NativeButtonController");

// Route for adding a new button
router.post("/addNativeButton", nativeButtonController.createNativeButton);
router.get("/getNativeButtons", nativeButtonController.getNativeButtons);
router.put("/updateNativeButtons", nativeButtonController.updateNativeButtons);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
