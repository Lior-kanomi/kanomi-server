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
    res.status(201).json({
      message: "Success",
      group: selectedDoc.group,
      desc: selectedDoc.desc,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.addStatsField = async (req, res) => {
  try {
    const group = req.query.group;
    const desc = req.query.desc;

    console.log(group, desc);

    // Update the 'desc' field of the document matching the provided group
    const updatedDoc = await ABTesting.findOneAndUpdate(
      { group: group },
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

exports.updateGroupeField = async (req, res) => {
  try {
    const group = req.query.group;
    const id = req.query.id;

    // TODO: Validate the id in Mixpanel so you will know the is the same group in both
    // TODO: Add the logic for replacing the group from one to another...

    // Update the 'desc' field of the document matching the provided group
    const updatedDoc = await ABTesting.findOneAndUpdate(
      { group: group },
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
