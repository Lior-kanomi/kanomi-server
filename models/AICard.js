const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const AICardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true,
  },
  description: {
    type: String, // field for storing the icon
  },
  isHotWebsite: {
    type: Boolean,
  },
  url: {
    type: String,
  },
  categories: {
    type: {
      text: Boolean,
      audio: Boolean,
      video: Boolean,
      image: Boolean,
    },
  },
});

// Creating the Mongoose model for the button collection
const AICard = mongoose.model("AICard", AICardSchema);

// Exports the button model for use in other parts of the application
module.exports = AICard;
