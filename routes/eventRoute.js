const express = require("express");
const router = express.Router();
const eventController = require("../controllers/EventController");

// Route for adding a new Event
router.get("/addEvent", eventController.createEvent);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Exports the router to be used in the main application
module.exports = router;
