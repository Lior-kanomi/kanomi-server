const ApplicationVars = require("../models/ApplicationVars");

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
    let applicationVars = await ApplicationVars.find({});
    applicationVars = applicationVars.map((item) => {
      return {
        ApplicationVariable: {
          ApplicationVariableName:
            item.applicationVariable.applicationVariableName,
          ApplicationVariableValue:
            item.applicationVariable.applicationVariableValue,
        },
      };
    });

    return res.status(200).json({ message: "success", data: applicationVars });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};
