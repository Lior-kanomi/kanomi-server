const mixpanel = require("../services/mixpanelService");
const UserAgent = require("../models/UserAgent"); // Assuming the UserAgent
const axios = require("axios");
const versionsHelper = require("../helpers/compareVersions");
const statHelper = require("../helpers/selectDocBasedOnStats");

exports.createChromeVersion = async (req, res) => {
  try {
    const {
      HTTP_User_Agent,
      brands,
      uaFullVersion,
      fullVersionList,
      Sec_CH_UA,
      Sec_CH_UA_Full_Version,
      Sec_CH_UA_Full_Version_List,
      stats,
    } = req.body;
    if (
      !HTTP_User_Agent ||
      !brands ||
      !uaFullVersion ||
      !fullVersionList ||
      !Sec_CH_UA ||
      !Sec_CH_UA_Full_Version_List ||
      !Sec_CH_UA_Full_Version ||
      stats
    ) {
      return res
        .status(400)
        .json({ error: "Bad Request: Missing required parameters" });
    }
    const newUserAgent = new UserAgent({
      HTTP_User_Agent,
      brands,
      uaFullVersion,
      fullVersionList,
      Sec_CH_UA,
      Sec_CH_UA_Full_Version_List,
      Sec_CH_UA_Full_Version,
      stats,
    });
    await newUserAgent.save();
    res.status(201).json({
      message: "Successfully created new Chrome version.",
      data: newUserAgent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the Chrome version." });
  }
};

exports.getChromeVersions = async (req, res) => {
  try {
    const count = await UserAgent.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomDoc = await UserAgent.findOne().skip(random);
    res.status(200).json({
      ChromeVersion: randomDoc.chromeVersion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Chrome version." });
  }
};

exports.getChromeVersionTimer = (req, res) => {
  try {
    const interval = 10; // in hours
    res.status(200).json({
      VersionInterval: interval,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Chrome version." });
  }
};
// ... rest of your imports and setup

exports.getChromeVersionForUser = async (req, res) => {
  try {
    // Get the user ID and version from the request query
    const userId = req.query.id;
    const currentVersion = req.query.version;

    // API that checks when is the right time to update
    if (
      userId === undefined ||
      userId === null ||
      currentVersion === undefined ||
      currentVersion === null
    ) {
      return res
        .status(400)
        .json({ error: "Bad Request: Missing required parameters" });
    }

    //TODO: validate if user version is lower than the stats

    const userAgentDocs = await UserAgent.find({});

    // Compare the existing version with the provided version
    let docToUpdate = statHelper.selectDocBasedOnStats(userAgentDocs);
    // If the method return null initial the 'docToUpdate' with the first doc.
    if (!docToUpdate) {
      docToUpdate = await UserAgent.findOne({});
    }
    if (currentVersion !== docToUpdate) {
      const properties = {
        eventPropty: `UA been updated from ${currentVersion} to ${docToUpdate}`,
        distinct_id: userId,
        time: Math.floor(Date.now() / 1000), // time should be in seconds since epoch
        // ...other event properties
      };
      mixpanel.track("UA updated", properties, (err) => {
        if (err) {
          console.log("Mixpanel Error");
        }
      });
    }
    return res.status(200).json({
      Message: "Success",
      ShouldUpdate: true,
      Data: docToUpdate, // Send the newer version if an update is needed
    });
    //TODO: add a logic that compare version by stats.
    // const response = await axios.get("https://mixpanel.com/api/2.0/engage/", {
    //   params: {
    //     distinct_id: userId,
    //   },
    //   auth: {
    //     username: process.env.MIXPANEL_SECRET,
    //     password: "",
    //   },
    // });
    // const existingVersion = response.data.results[0].$properties.chrome_version;
    // if (!existingVersion) {
    //   return res
    //     .status(404)
    //     .json({ error: "No existing Chrome version found for this user." });
    // }

    // // Respond with the result
    // res.status(200).json({
    //   message: "Success",
    //   shouldUpdate: shouldUpdate,
    //   newVersion: shouldUpdate ? currentVersion : null, // Send the newer version if an update is needed
    // });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Chrome version." });
  }
};

exports.addStatsField = async (req, res) => {
  try {
    // Update all documents in the UserAgent collection to include a 'stats' field with a default value, e.g., 0.5
    await UserAgent.updateMany({}, { $set: { stats: 0.5 } });
    res
      .status(200)
      .json({ message: "Stats field added successfully to all documents." });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while adding the stats field.",
      details: error.message,
    });
  }
};

exports.deleteUserAgentDoc = async (req, res) => {
  const userAgentString = req.query.userAgent;

  try {
    const result = await UserAgent.deleteOne({
      HTTP_User_Agent: userAgentString,
    });

    if (!userAgentString) {
      return res.status(400).send({ message: "User agent is required" });
    }

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "User agent not found", data: {} });
    }

    res
      .status(200)
      .json({ message: "User agent deleted successfully", data: {} });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting the user agent", error: err });
  }
};
