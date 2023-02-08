const Button = require("../models/Button");
const fs = require("fs");
const path = require("path");

// Create a new user and save it to the database
exports.createButton = async (req, res) => {
  Button.findOne({ buttonName: req.body.buttonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!button) {
      const { buttonName, url, icon } = req.body;
      const newButton = new Button({ buttonName, url, icon });
      Button.create(newButton)
        .then((createdButton) => {
          // If the Button was successfully created, send a 200 OK response with the created Button document
          res.status(200).json({
            message: "User updated successfully",
            data: createdButton,
          });
        })
        .catch((error) => {
          // If there is an error, send a 500 error response
          res.status(500).send(error);
        });
    } else {
      button.save((error) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        res
          .status(200)
          .json({ message: "User updated successfully", data: button });
      });
    }
  });
};

exports.updateButton = async (req, res) => {
  try {
    const buttonName = req.params.buttonName;
    const hint = req.body.hint;
    const icon = req.body.icon;

    // Find the button with the specified button name
    const updatedDocument = await Button.findOne({ buttonName: buttonName });

    // Add or update the hint field
    updatedDocument.hint = hint;
    updatedDocument.icon = icon;

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
    const newButtons = buttons.map((button) => {
      return {
        Name: button.buttonName,
        URL: button.url,
      };
    });
    return res.status(200).json({ data: newButtons, message: "success" });
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
