const express = require("express");
const router = express.Router();

// Route for deleting all the events
router.post("/getPermissionToBanner", (req, res) => {
  const { userUrl } = req.body;
  const regex = /^(?:https?:\/\/)?(?:www\.)?(amazon|ebay)\.com(?:\/|$)/;

  if (regex.test(userUrl.toLowerCase())) {
    let message = userUrl.toLowerCase().includes("amazon")
      ? "Great discount for Amazon"
      : "Great discount for Ebay";

    let image = userUrl.toLowerCase().includes("amazon")
      ? "present_box.png"
      : "present_box2.png";
    return res.status(200).json({
      data: {
        style: `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: transparent;
      border: 3px solid #000; 
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; /* Center items horizontally */
      box-sizing: border-box;
      border-radius: 10px; /* Rounded corners */
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Soft shadow */
      z-index: 10001; /* Ensure it's above the overlay */
      width: 450px; /* Width adjusted for vertical rectangle */
      min-height: 500px; /* Height adjusted for vertical rectangle */
    `,
        message,
        image
      },
      message: "ok"
    });
  }
  return res.status(200).json({ data: false, message: "OK" });
});

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
