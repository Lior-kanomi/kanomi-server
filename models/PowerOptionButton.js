const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const PowerOptionButtonSchema = new mongoose.Schema({
  buttonName: {
    type: String,
    // Enumerated list of possible button names
    enum: [
      // Need to add the Media button
      "PowerButton",
      "HibernateButton",
      "LogOffbutton",
      "LockButton",
      "ShutDownButton",
      "RestartButton",
      "SleepButton",
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
  // index: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
});

// NativeButtonSchema.pre("save", async function (next) {
//   if (!this.index) {
//     const maxIndexButton = await this.constructor.findOne().sort("-index");
//     this.index = (maxIndexButton ? maxIndexButton.index : 0) + 1;
//   }
//   next();
// });

// Creating the Mongoose model for the button collection
const PowerOptionButton = mongoose.model(
  "PowerOptionButton",
  PowerOptionButtonSchema
);

// Exports the button model for use in other parts of the application
module.exports = PowerOptionButton;
