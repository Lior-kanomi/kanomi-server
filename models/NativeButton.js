const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const NativeButtonSchema = new mongoose.Schema({
  buttonName: {
    type: String,
    // Enumerated list of possible button names
    enum: [
      // Need to add the Media button
      "CalculatorButton",
      "SnippingToolButton",
      "BluetoothButton",
      "ThemeChangeButton",
      "MediaButton",
      "NextButton",
      "PreviousButton",
      "PlayButton",
    ],
    required: true, // buttonName is a required field
  },
  icon: {
    type: String, // field for storing the icon
  },

  counter: {
    type: Number,
    default: 1, // sets a default value of 1 for the counter field
  },

  hint: {
    type: String, // a tooltip field
  },
});

// Creating the Mongoose model for the button collection
const NativeButton = mongoose.model("NativeButton", NativeButtonSchema);

// Exports the button model for use in other parts of the application
module.exports = NativeButton;
