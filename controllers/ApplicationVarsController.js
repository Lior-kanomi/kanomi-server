const ApplicationVars = require("../models/ApplicationVars");
const FeedUrlController = require("./FeedUrlController");
// Create a new user and save it to the database
exports.createApplicationVar = async (req, res) => {
  try {
    const applicationVars = await ApplicationVars.findOne({
      applicationVariable: req.body.applicationVariable,
    });
    if (!applicationVars) {
      const { applicationVariable } = req.body;
      const applicationVar = new ApplicationVars({ applicationVariable });
      const createdApplicationVar = await ApplicationVars.create(
        applicationVar
      );
      res.status(200).json({
        message: "application var created successfully",
        data: createdApplicationVar,
      });
    } else {
      applicationVars.variableName = req.body.variableName;
      const updatedApplicationVar = await applicationVars.save();
      res.status(200).json({
        message: "application var updated successfully",
        data: updatedApplicationVar,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationVars = async (req, res) => {
  try {
    let applicationVars = await ApplicationVars.find({});
    const feedUrl = await FeedUrlController.getApplicationVariableFeed();
    applicationVars = applicationVars.map((item) => {
      return {
        ApplicationVariableName:
          item.applicationVariable.applicationVariableName,
        ApplicationVariableValue:
          item.applicationVariable.applicationVariableValue,
      };
    });
    if (feedUrl.message == "success") {
      applicationVars.push(feedUrl.data);
    }
    return res.status(200).json({ message: "success", data: applicationVars });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};
