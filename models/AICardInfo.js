const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const AICardInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    // Enumerated list of possible button names
    required: true // buttonName is a required field
  },
  rating: {
    type: Number // field for storing the icon
  },
  lightThemeIcon: {
    type: String
  },
  icon: {
    type: String
  },
  description: {
    type: String
  },
  counter: {
    type: Number,
    default: 1 // sets a default value of 1 for the counter field
  },
  url: {
    type: String
  },
  hint: {
    type: String // a tooltip field
  }
});

// Creating the Mongoose model for the button collection
const AICardInfo = mongoose.model("AICardInfo", AICardInfoSchema);

// Exports the button model for use in other parts of the application
module.exports = AICardInfo;
