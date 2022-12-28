const Button = require('../models/Button');

// Create a new user and save it to the database
exports.createButton = async (req, res) => {
  Button.findOne({ buttonName: req.body.buttonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message});
    }
    if (!button) {
      const {buttonName,url,icon} = req.body;
      const newButton = new Button({ buttonName,url,icon });
        Button.create(newButton)
    .then((createdButton) => {
      // If the Button was successfully created, send a 200 OK response with the created Button document
      res.status(200).json({ message: 'User updated successfully', data: createdButton });
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
        res.json({ message: 'User updated successfully', data: button });
      });
    }
  });
};

exports.getLink = async (req, res) => {
  Button.findOne({ buttonName: req.params.buttonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message});
    }
    if (button) {
      console.log(button);
      return res.status(200).json({ message: "Success",data:button});
    }
    return res.status(400).json({ message: "faliure, the button isn't found",data:""});
  })
};
