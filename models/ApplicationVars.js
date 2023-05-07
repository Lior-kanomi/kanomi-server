const mongoose = require("mongoose");

const applicationVarsSchema = new mongoose.Schema({
  applicationVariable: {
    applicationVariableName: {
      type: String,
      required: true,
      unique: true,
    },
    applicationVariableValue: {
      type: String,
      required: true,
    },
  },
});

const applicationVars = mongoose.model(
  "applicationVars",
  applicationVarsSchema
);

module.exports = applicationVars;
