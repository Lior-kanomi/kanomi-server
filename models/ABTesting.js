const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const ABTestingSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  stats: {
    type: Number,
    required: true,
  },
  desc: {
    type: Number,
    required: true,
  },
});

// Creating the Mongoose model for the button collection
const ABTesting = mongoose.model("ABTesting", ABTestingSchema);

// Exports the button model for use in other parts of the application
module.exports = ABTesting;
