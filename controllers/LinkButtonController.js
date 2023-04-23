const Button = require("../models/LinkButton");
const MenuController = require("./MenuButtonsController");
const NativeController = require("./NativeButtonController");
const PowerController = require("./PowerButtonController");
const SettingController = require("./SettingButtonController");
const AIController = require("./AIButtonController");
const AICardController = require("./AICardController");

// Create a new user and save it to the database
exports.createButton = async (req, res) => {
  try {
    const button = await Button.findOne({ buttonName: req.body.buttonName });
    if (!button) {
      const { buttonName, url, icon } = req.body;
      const newButton = new Button({ buttonName, url, icon });
      const createdButton = await Button.create(newButton);
      res.status(200).json({
        message: "Button created successfully",
        data: createdButton,
      });
    } else {
      button.save((error) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        res
          .status(200)
          .json({ message: "Button updated successfully", data: button });
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateButtons = async (req, res) => {
  try {
    const buttons = await Button.updateMany(
      {},
      { $unset: { darkThemeIcon: "" } },
      { new: true }
    );
    return res.status(200).json({ message: "Success", data: buttons });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ message: "faliure, the button isn't found", data: error });
  }
};

exports.getLink = async (req, res) => {
  Button.findOne(
    { buttonName: req.params.buttonName },
    async (error, button) => {
      if (error) {
        return res.status(500).json({ message: error.message, data: "" });
      }
      if (button) {
        button.counter += 1;
        await button.save((error) => {
          if (error) {
            console.log(error);
          }
        });
        return res.status(200).json({ message: "Success", data: button.url });
      }
      return res
        .status(400)
        .json({ message: "faliure, the button isn't found", data: "" });
    }
  );
};

exports.getIcon = async (req, res) => {
  Button.findOne({ buttonName: req.params.buttonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (button) {
      console.log(button);
      return res.status(200).json({ message: "Success", icon: button.icon });
    }
    return res
      .status(400)
      .json({ message: "faliure, the button isn't found", data: "" });
  });
};

exports.getLinks = async (req, res) => {
  try {
    const buttons = await Button.find();
    const newButtons = buttons.filter(
      (button) =>
        button.buttonName != "KanomiSearchBar" &&
        button.buttonName != "MainAppBarBrowserButton"
    );

    const nativeButtons = await NativeController.getNativeButtons();
    const menuButtons = await MenuController.getMenuButtons();
    const powerOptionsButtons = await PowerController.getPowerOptionsButtons();
    const AIOptionsButtons = await AIController.getAIOptionsButtons();
    const AICards = await AICardController.getAICards();
    const settingOptionsButtons =
      await SettingController.getSettingOptionsButtons();

    const linksButtons = newButtons.map((button) => {
      return {
        Name: button.buttonName,
        URL: button.url,
        Icon: button.icon,
        Hint: button.hint,
      };
    });

    const data = {
      AICards,
      nativeButtons,
      menuButtons,
      linksButtons,
      powerOptionsButtons,
      settingOptionsButtons,
      AIOptionsButtons,
    };
    return res.status(200).json({ data, message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};

exports.resetCounters = async (req, res) => {
  try {
    await Button.updateMany({}, { $set: { counter: 0 } });

    return res.status(200).json({ message: "Counters successfully reset." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
