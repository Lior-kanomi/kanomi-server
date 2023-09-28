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
    const interval = 10; // in hours
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

exports.getChromeVersioForUser = (req, res) => {
  try {
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the Chrome version." });
  }
};
