const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const AIOptionButtonSchema = new mongoose.Schema({
  buttonName: {
    type: String,
    // Enumerated list of possible button names
    enum: ["AI", "Chat GPT"],
    required: true, // buttonName is a required field
  },
  DarkThemeIcon: {
    type: String, // field for storing the icon
  },
  lightThemeIcon: {
    type: String,
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
const AIptionButton = mongoose.model("AIOptionButton", AIOptionButtonSchema);

// Exports the button model for use in other parts of the application
module.exports = AIptionButton;
