const mongoose = require("mongoose");

const applicationVarsSchema = new mongoose.Schema({
  variableName: {
    type: String,
  },
});

const applicationVars = mongoose.model(
  "applicationVars",
  applicationVarsSchema
);

module.exports = applicationVars;
