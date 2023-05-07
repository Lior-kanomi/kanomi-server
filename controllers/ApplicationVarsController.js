const ApplicationVars = require("../models/ApplicationVars");

// Create a new user and save it to the database
exports.createApplicationVar = async (req, res) => {
  try {
    const applicationVars = await ApplicationVars.findOne({
      buttonName: req.body.buttonName,
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

exports.getAIOptionsButtons = async (req, res) => {
  try {
    const buttons = await applicationVars
      .find({
        buttonName: { $ne: "AI" },
      })
      .lean()
      .exec();
    const optionsButtons = buttons.map((button) => {
      return {
        Name: button.buttonName,
        Icon: button.DarkThemeIcon,
        Hint: button.hint,
      };
    });
    return optionsButtons;
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};

exports.removeButtonSuffix = async (req, res) => {
  try {
    const buttons = await SettingOptionButton.find({});
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const updatedName = button.buttonName.replace(/Button$/i, "");
      button.buttonName = updatedName;
      await button.save();
    }
    console.log("Button names updated successfully");

    res.send("success");
  } catch (error) {
    console.error("Error updating button names: ", error);
    res.send("Fail");
  }
};

exports.updateapplicationVars = async (req, res) => {
  try {
    const buttons = await applicationVars.updateMany(
      {}, // Update all documents in the collection
      {
        $rename: { icon: "DarkThemeIcon" }, // Rename the "icon" field to "DarkThemeIcon"
        $set: { lightThemeIcon: null }, // Add the new "lightThemeIcon" field
      }
    );
    return res.status(200).json({ message: "success", data: buttons });
  } catch (error) {
    res.send("error");
  }
};
