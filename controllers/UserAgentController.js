const mixpanel = require("../services/mixpanelService");
const UserAgent = require("../models/UserAgent"); // Assuming the UserAgent
const axios = require("axios");
const versionsHelper = require("../helpers/compareVersions");

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
    } = req.body;
    if (
      !HTTP_User_Agent ||
      !brands ||
      !uaFullVersion ||
      !fullVersionList ||
      !Sec_CH_UA ||
      !Sec_CH_UA_Full_Version_List ||
      !Sec_CH_UA_Full_Version
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
    const userAgentDocs = await UserAgent.find();
    // Compare the existing version with the provided version
    const docToUpdate = versionsHelper.findNewestVersion(userAgentDocs);
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
