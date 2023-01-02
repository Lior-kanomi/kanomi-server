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
      button.counter += 1;
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
    const imagePath = "../images/kanomi_panda_head_transparent2.png";
    const imageData = fs
      .readFileSync(`${__dirname}/../images/kanomi_panda_head_transparent2.png`)
      .toString("base64");
  } catch (error) {
    res.send(error);
  }

  console.log();
  try {
    const updatedDocument = Button.findOne({
      buttonName: "MainAppBarBrowserButton",
    });
    updatedDocument.icon = imageData;
    await updatedDocument.save();
    res.send("Document updated successfully");
  } catch (error) {
    res.send(error);
  }
};

exports.getLink = async (req, res) => {
  Button.findOne({ buttonName: req.params.buttonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (button) {
      return res.status(200).json({ message: "Success", data: button.url });
    }
    return res
      .status(400)
      .json({ message: "faliure, the button isn't found", data: "" });
  });
};

exports.getIcon = async (req, res) => {
  Button.findOne({ buttonName: req.params.buttonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (button) {
      console.log(button);
      const imageBuffer = Buffer.from(button.icon, "base64");
      const imageData = imageBuffer.toString("base64");
      button.icon = imageBuffer.toString("base64");

      console.log(imageData);
      return res.status(200).json({ message: "Success", icon: imageData });
    }
    return res
      .status(400)
      .json({ message: "faliure, the button isn't found", data: "" });
  });
};
