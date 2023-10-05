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

exports.addStatsField = async (req, res) => {
  try {
    const group = req.query.group;
    const desc = req.query.desc;

    // Add 'desc' field to all documents that don't have one
    await ABTesting.updateMany(
      { desc: { $exists: false } },
      { $set: { desc: "Default description" } }
    );

    // Update the 'desc' field of the document matching the provided group
    const updatedDoc = await ABTesting.findOneAndUpdate(
      { group },
      { $set: { desc } },
      { new: true } // This option returns the updated document
    );

    res.status(200).json({
      message: "Description field updated successfully.",
      data: updatedDoc,
    });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the description field.",
      details: error.message,
    });
  }
};

exports.createABTestingGroup = async (req, res) => {
  try {
    const { stats, group, desc } = req.body;
    if ((!stats || !group, !desc)) {
      return res
        .status(400)
        .json({ error: "Bad Request: Missing required parameters" });
    }
    const newABTestingGroup = new ABTesting({
      group,
      stats,
      desc,
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
