const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ Message: "success", Data: 10 });
});
module.exports = router;
