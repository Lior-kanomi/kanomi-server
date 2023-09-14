const mongoose = require("mongoose");

// Defining the button schema for the MongoDB collection
const UserAgentSchema = new mongoose.Schema({
  chromeVersion: {
    type: String,
    required: true,
  },
});

// Creating the Mongoose model for the button collection
const UserAgent = mongoose.model("UserAgent", UserAgentSchema);

// Exports the button model for use in other parts of the application
module.exports = UserAgent;
