const ApplicationVars = require("../models/ApplicationVars");

// Create a new user and save it to the database
exports.createApplicationVar = async (req, res) => {
  try {
    const applicationVars = await ApplicationVars.findOne({
      variableName: req.body.variableName,
    });
    if (!applicationVars) {
      const { variableName } = req.body;
      const applicationVar = new ApplicationVars({ variableName });
      const createdApplicationVar = await applicationVars.create(
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
        message: "AI option button updated successfully",
        data: updatedApplicationVar,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getApplicationVars = async (req, res) => {
  try {
    const applicationVars = await ApplicationVars.find({});

    return res.status(200).json({ message: "success", data: applicationVars });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};
