const ABTesting = require("../models/ABTesting"); // Assuming the UserAgent

exports.getABTestingGroup = async (req, res) => {
  try {
    // Query the database to get the current percentages
    const groups = await ABTesting.find({});

    if (!groups || groups.length === 0) {
      res.status(404).send("No documents found");
      return;
    }

    console.log(groups);
    // Calculate the cumulative stats
    const cumulativeStats = groups.reduce((acc, doc) => acc + doc.stats, 0);

    console.log(cumulativeStats, "before random number");

    // Randomly generate a number between 0 and the cumulative stats
    const randomNum = Math.random() * cumulativeStats;
    console.log(cumulativeStats, randomNum, "after random number");
    // Determine which document to select based on the random number and cumulative stats
    let cumulativeCount = 0;
    let selectedDoc;
    for (const doc of groups) {
      cumulativeCount += doc.stats;
      if (randomNum < cumulativeCount) {
        selectedDoc = doc;
        break;
      }
    }

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
