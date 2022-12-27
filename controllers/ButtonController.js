const Button = require('../models/Button');

// Create a new user and save it to the database
exports.createButton = async (req, res) => {
  Button.findOne({ name: req.params.ButtonName }, (error, button) => {
    if (error) {
      return res.status(500).json({ message: error.message + "validation error"});
    }
    if (!button) {
      const newButton = new Button({ name: req.params.ButtonName });
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
