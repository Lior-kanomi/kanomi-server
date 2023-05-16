const PowerOptionButton = require("../models/PowerOptionButton");
const SettingOptionButton = require("../models/SettingOptionButton");
const AIOptionButton = require("../models/AIOptionButton");

exports.getMenuButtons = async (req, res) => {
  try {
    const PowerButton = await PowerOptionButton.findOne({
      buttonName: "Power",
    });
    const SettingButton = await SettingOptionButton.findOne({
      buttonName: "Setting",
    });
    const AIButton = await AIOptionButton.findOne({
      buttonName: "AI",
    });
    const menuButtons = [SettingButton, PowerButton, AIButton].map((button) => {
      return {
        Name: button.buttonName,
        Icon: button.DarkThemeIcon,
        Hint: button.hint,
        LightThemeIcon: button.lightThemeIcon,
      };
    });
    return menuButtons;
  } catch (err) {
    return { message: err.message, data: [] };
  }
};
