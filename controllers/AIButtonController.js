const AIOptionButton = require("../models/AIOptionButton");

// Create a new user and save it to the database
exports.createAIOptionButton = async (req, res) => {
  try {
    const aiOptionButton = await AIOptionButton.findOne({
      buttonName: req.body.buttonName,
    });
    if (!aiOptionButton) {
      const { buttonName, hint, icon } = req.body;
      const newButton = new AIOptionButton({ buttonName, icon, hint });
      const createdButton = await AIOptionButton.create(newButton);
      res.status(200).json({
        message: "AI option button created successfully",
        data: createdButton,
      });
    } else {
      aiOptionButton.buttonName = req.body.buttonName;
      aiOptionButton.icon = req.body.icon;
      aiOptionButton.hint = req.body.hint;
      const updatedButton = await AIOptionButton.save();
      res.status(200).json({
        message: "AI option button updated successfully",
        data: updatedButton,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAIOptionsButtons = async (req, res) => {
  try {
    const buttons = await AIOptionButton.find({
      buttonName: { $ne: "AI" },
    })
      .lean()
      .exec();
    const optionsButtons = buttons.map((button) => {
      return {
        Name: button.buttonName,
        Icon: button.icon,
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

exports.updateAIOptionButton = async (req, res) => {
  try {
    const buttons = await AIOptionButton.updateMany(
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
