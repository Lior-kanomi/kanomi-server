const PowerOptionButton = require("../models/PowerOptionButton");
const SettingOptionButton = require("../models/SettingOptionButton");

exports.getMenuButtons = async (req, res) => {
  try {
    const PowerButton = await PowerOptionButton.findOne({
      buttonName: "PowerButton",
    });
    const SettingButton = await SettingOptionButton.findOne({
      buttonName: "SettingButton",
    });
    const menuButtons = [PowerButton, SettingButton].map((button) => {
      return {
        Name: button.buttonName,
        Icon: button.icon,
        Hint: button.hint,
      };
    });
    return res.status(200).json({ data: menuButtons, message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};
