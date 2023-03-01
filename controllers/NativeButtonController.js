const NativeButton = require("../models/NativeButton");

// Create a new user and save it to the database
exports.createNativeButton = async (req, res) => {
  try {
    const nativeButton = await NativeButton.findOne({
      buttonName: req.body.buttonName,
    });
    if (!nativeButton) {
      const { buttonName, hint, icon } = req.body;
      const newButton = new NativeButton({ buttonName, icon, hint });
      const createdButton = await NativeButton.create(newButton);
      res.status(200).json({
        message: "Native button created successfully",
        data: createdButton,
      });
    } else {
      nativeButton.buttonName = req.body.buttonName;
      nativeButton.icon = req.body.icon;
      nativeButton.hint = req.body.hint;
      const updatedButton = await nativeButton.save();
      res.status(200).json({
        message: "Native button updated successfully",
        data: updatedButton,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateButton = async (req, res) => {
  try {
    const buttonName = req.params.buttonName;
    const hint = req.body.hint;
    const icon = req.body.icon;

    // Find the button with the specified button name
    const updatedDocument = await Button.findOne({ buttonName: buttonName });

    // Add or update the hint field
    updatedDocument.icon = icon;
    updatedDocument.hint = hint;
    updatedDocument.hint = hint;

    // Save the updated document
    await updatedDocument.save();

    // Return the updated document along with a success message
    res
      .json({
        data: updatedDocument,
        messsage: "Document updated successfully",
      })
      .status(200);
  } catch (error) {
    res.status(400).json({ message: "document error" });
  }
};

exports.getLink = async (req, res) => {
  NativeButton.findOne(
    { buttonName: req.params.buttonName },
    async (error, nativeButton) => {
      if (error) {
        return res.status(500).json({ message: error.message, data: "" });
      }
      if (nativeButton) {
        nativeButton.counter += 1;
        await nativeButton.save((error) => {
          if (error) {
            console.log(error);
          }
        });
        return res
          .status(200)
          .json({ message: "Success", data: nativeButton.url });
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
    const filteredButtons = buttons.filter(
      (button) =>
        button.buttonName != "KanomiSearchBar" &&
        button.buttonName != "MainAppBarBrowserButton"
    );
    const newButtons = filteredButtons.map((button) => {
      return {
        Name: button.buttonName,
        URL: button.url,
        Icon: button.icon,
        Hint: button.hint,
      };
    });
    return res.status(200).json({ data: newButtons, message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};

exports.resetCounters = async (req, res) => {
  try {
    await NativeButton.updateMany({}, { $set: { counter: 0 } });
    return res.status(200).json({ message: "Counters successfully reset." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
