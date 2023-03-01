const SettingOptionButton = require("../models/SettingOptionButton");

// Create a new user and save it to the database
exports.createSettingOptionButton = async (req, res) => {
  try {
    const settingOptionButton = await SettingOptionButton.findOne({
      buttonName: req.body.buttonName,
    });
    if (!settingOptionButton) {
      const { buttonName, hint, icon } = req.body;
      const newButton = new SettingOptionButton({ buttonName, icon, hint });
      const createdButton = await SettingOptionButton.create(newButton);
      res.status(200).json({
        message: "Setting button created successfully",
        data: createdButton,
      });
    } else {
      settingOptionButton.buttonName = req.body.buttonName;
      settingOptionButton.icon = req.body.icon;
      settingOptionButton.hint = req.body.hint;
      const updatedButton = await settingOptionButton.save();
      res.status(200).json({
        message: "Setting button updated successfully",
        data: updatedButton,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
