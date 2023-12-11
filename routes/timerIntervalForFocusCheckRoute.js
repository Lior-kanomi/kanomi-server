const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "success", data: 35 });
});
module.exports = router;
