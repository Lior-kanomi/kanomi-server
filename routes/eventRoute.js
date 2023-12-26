const express = require("express");
const router = express.Router();
const eventController = require("../controllers/EventController");
const logError = require("../middlewares/logError");

// Route for adding a new Event
router.post("/addEvent", logError, eventController.createEvent);

// Route for deleting all the events
router.delete("/deleteEvents", eventController.deleteEvents);

// Define a catch-all route to handle invalid routes
// router.use((req, res, next) => {
//   res.status(404).render("error");
// });

// Exports the router to be used in the main application
module.exports = router;
