const mongoose = require("mongoose");
const UserAgent = require("../models/UserAgent"); // Assuming the UserAgent

exports.createChromeVersion = async (req, res) => {
  try {
    const { chromeVersion } = req.body;
    if (!chromeVersion) {
      return res.status(400).json({ error: "chromeVersion is required." });
    }
    const newUserAgent = new UserAgent({
      chromeVersion: chromeVersion,
    });
    await newUserAgent.save();
    res
      .status(201)
      .json({ message: "Successfully created new Chrome version." });
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
    res.status(200).json({ chromeVersion: randomDoc.chromeVersion });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Chrome version." });
  }
};
