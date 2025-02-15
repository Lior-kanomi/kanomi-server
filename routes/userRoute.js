const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// Route for adding a new Event
router.post("/addUser", userController.createUser);

// Route for adding a new Event
router.get("/getUsers", userController.getUsers);

// Route for deleting all the events
router.delete("/deleteUsers", userController.deleteUsers);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
