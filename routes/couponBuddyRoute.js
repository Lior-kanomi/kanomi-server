const express = require("express");
const router = express.Router();
const couponBuddyController = require("../controllers/couponBuddyController");
const { getBannerProps } = require("../helpers/getBannerProps");
const axios = require("axios");
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

router.get("/getAwinUrl", async (req, res) => {
  try {
    const publisherId = "1553920";
    const advertiserId = "64216";

    const url = `https://api.awin.com/publishers/${publisherId}/linkbuilder/generate`;
    const bearerToken = "b457aa82-5816-44c8-9754-b9c46c254602";

    const response = await axios.post(
      url,
      {
        destinationUrl: "https://www.atlascarbonapp.com/",
        advertiserId: "64216",
        parameters: {
          clickref: "ref=couponBuddy"
        },
        shorten: true
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`
        }
      }
    );
    const data = response.data;

    return res.status(200).json({
      data,
      message: "ok"
    });
    // Store the result in a variable named res
  } catch (error) {
    // Handle any errors here
    return res.status(400).json({
      data: [],
      message: "err"
    });
  }
});
router.post("/getAffiliateUrl", couponBuddyController.getAffiliateUrl);

// Define a catch-all route to handle invalid routes
router.use((req, res, next) => {
  res.status(404).render("error");
});

// Exports the router to be used in the main application
module.exports = router;
