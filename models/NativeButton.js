const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const NativeButtonSchema = new mongoose.Schema({
  buttonName: {
    type: String,
    // Enumerated list of possible button names
    enum: [
      // Need to add the Media button
      { value: "CalculatorButton", order: 3 },
      { value: "SnippingToolButton", order: 2 },
      { value: "BluetoothButton", order: 1 },
      { value: "ThemeChangeButton", order: 4 },
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
  index: {
    type: Number,
    required: true,
    unique: true,
  },
});

NativeButtonSchema.pre("save", async function (next) {
  if (!this.index) {
    const maxIndexButton = await this.constructor.findOne().sort("-index");
    this.index = (maxIndexButton ? maxIndexButton.index : 0) + 1;
  }
  next();
});

NativeButtonSchema.index({ buttonName: 1 });
// Creating the Mongoose model for the button collection
const NativeButton = mongoose.model("NativeButton", NativeButtonSchema);

// Exports the button model for use in other parts of the application
module.exports = NativeButton;
