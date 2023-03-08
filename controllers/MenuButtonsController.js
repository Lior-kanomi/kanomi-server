const PowerOptionButton = require("../models/PowerOptionButton");
const SettingOptionButton = require("../models/SettingOptionButton");

exports.getMenuButtons = async (req, res) => {
  try {
    const PowerButton = await PowerOptionButton.findOne({
      buttonName: "Power",
    });
    const SettingButton = await SettingOptionButton.findOne({
      buttonName: "Setting",
    });
    const AIButton = await SettingOptionButton.findOne({
      buttonName: "AI",
    });
    const menuButtons = [SettingButton, PowerButton, AIButton].map((button) => {
      return {
        Name: button.buttonName,
        Icon: button.icon,
        Hint: button.hint,
      };
    });
    return menuButtons;
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};
