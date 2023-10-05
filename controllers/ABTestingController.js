const ABTesting = require("../models/ABTesting"); // Assuming the UserAgent
const statHelper = require("../helpers/selectDocBasedOnStats");
exports.getABTestingGroup = async (req, res) => {
  try {
    // Query the database to get the current percentages
    const groups = await ABTesting.find({});

    if (!groups || groups.length === 0) {
      res.status(404).send("No documents found");
      return;
    }

    const selectedDoc = statHelper.selectDocBasedOnStats(groups) || "A";
    res.status(201).json({ message: "Success", group: selectedDoc.group });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.createABTestingGroup = async (req, res) => {
  try {
    const { stats, group } = req.body;
    if (!stats || !group) {
      return res
        .status(400)
        .json({ error: "Bad Request: Missing required parameters" });
    }
    const newABTestingGroup = new ABTesting({
      group,
      stats,
    });
    await newABTestingGroup.save();
    res.status(201).json({
      message: "Successfully created new Chrome version.",
      data: newABTestingGroup,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the Chrome version." });
  }
};
