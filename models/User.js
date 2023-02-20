const mongoose = require("mongoose");
const Button = require("./Button");

const userSchema = new mongoose.Schema({
  _id: String,
  geo_location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  device_type: String,
  operating_system_version: String,
  browser: String,
  error_log: [
    {
      message: String,
      status: String,
    },
  ],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

userSchema.index({ geo_location: "2dsphere" });

const User = mongoose.model("User", userSchema);

module.exports = User;
