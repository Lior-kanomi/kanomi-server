const Button = require('../models/Button');

// Create a new user and save it to the database
exports.createButton = async (req, res) => {
  Button.findOne({ name: req.params.ButtonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message + "validation error"});
    }
    if (!button) {
      const newButton = new Button({ name: req.params.ButtonName });
      newButton.save((error) => {
        if (error) {
          return res.status(500).json({ message: error.message + "Saving error"});
        }
        res.json({ message: 'User created successfully', data: newButton });
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
