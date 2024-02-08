const Button = require("../models/LinkButton");
const MenuController = require("./MenuButtonsController");
const NativeController = require("./NativeButtonController");
const PowerController = require("./PowerButtonController");
const SettingController = require("./SettingButtonController");
const AIController = require("./AIButtonController");
const AICardController = require("./AICardController");
const AICardInfoController = require("./AICardInfoController");

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
        data: createdButton
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
      {}, // Update all documents in the collection
      {
        $rename: { [req.body.icon]: "DarkThemeIcon" }, // Rename the "icon" field to "DarkThemeIcon"
        $set: { lightThemeIcon: null } // Add the new "lightThemeIcon" field
      }
    );
    return res.status(200).json({ message: "success", data: buttons });
  } catch (error) {
    res.send("error");
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
    const settingOptionsButtons =
      await SettingController.getSettingOptionsButtons();
    const AIInfoCardsOptionsButtons =
      await AICardInfoController.getAICardsInfoToLinksButtons();

    const linksButtons = newButtons.map((button) => {
      return {
        Name: button.buttonName,
        URL: button.url,
        Icon: button.DarkThemeIcon,
        Hint: button.hint,
        LightThemeIcon: button.lightThemeIcon
      };
    });

    const data = {
      nativeButtons,
      menuButtons,
      linksButtons,
      powerOptionsButtons,
      settingOptionsButtons,
      AIInfoCardsOptionsButtons
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
