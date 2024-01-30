const express = require("express");
const router = express.Router();
const { getBannerProps } = require("../helpers/getBannerProps");
// Route for deleting all the events
router.post("/getPermissionToBanner", (req, res) => {
  const { userUrl } = req.body;
  const regex = /^(?:https?:\/\/)?(?:www\.)?(amazon|ebay|)\.com(?:\/|$)/;
  const image = "present_box.png";
  const data = getBannerProps(userUrl);
  return res.status(200).json({
    data,
    message: "ok"
  });
});

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
