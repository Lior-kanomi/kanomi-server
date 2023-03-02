const PowerOptionButton = require("../models/PowerOptionButton");

// Create a new user and save it to the database
exports.createPowerOptionButton = async (req, res) => {
  try {
    const powerOptionButton = await PowerOptionButton.findOne({
      buttonName: req.body.buttonName,
    });
    if (!powerOptionButton) {
      const { buttonName, hint, icon } = req.body;
      const newButton = new PowerOptionButton({ buttonName, icon, hint });
      const createdButton = await PowerOptionButton.create(newButton);
      res.status(200).json({
        message: "Power button created successfully",
        data: createdButton,
      });
    } else {
      powerOptionButton.buttonName = req.body.buttonName;
      powerOptionButton.icon = req.body.icon;
      powerOptionButton.hint = req.body.hint;
      const updatedButton = await powerOptionButton.save();
      res.status(200).json({
        message: "Power button updated successfully",
        data: updatedButton,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPowerOptionsButtons = async (req, res) => {
  try {
    const buttons = await PowerOptionButton.find({
      buttonName: { $ne: "Power" },
    })
      .lean()
      .exec();
    console.log(buttons);
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
