const express = require("express");
const router = express.Router();
const buttonController = require("../controllers/ButtonController");

// Route for adding a new button
router.post("/addButton", buttonController.createButton);

// Route for retrieving the link of a button based on its name
router.get("/getLink/:buttonName", buttonController.getLink);

// Route for updating a button's details
router.post("/updateButton/:buttonName", buttonController.updateButton);

// Route for getting the icon of a button based on its name
router.get("/getImage/:buttonName", buttonController.getIcon);

// Route for retrieving the link of a button based on its name
router.get("/getLinks", buttonController.getLinks);

// Route for retrieving the link of a button based on its name
router.get("/getLinksDemo", buttonController.getLinksDemo);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
