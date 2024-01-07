const express = require("express");
const router = express.Router();

// Route for deleting all the events
router.post("/getPermissionToBanner", (req, res) => {
  if (req.headers["x-api-key"] !== "123") {
    return res.send("Access denied").status(403);
  }
  const { userUrl } = req.body;
  const regex = /^(?:https?:\/\/)?(?:www\.)?(amazon|ebay)\.com(?:\/|$)/;
  if (regex.test(userUrl.toLowerCase())) {
    return res
      .status(200)
      .json({ data: true, message: "Should drop a banner in this bitch!!" });
  }
  return res
    .status(200)
    .json({ data: false, message: "Should not drop a banner in this bitch!!" });
});

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
