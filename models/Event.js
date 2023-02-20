const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  eventName: {
    type: String,
    enum: [
      "Calculator Button Hover",
      "WhatsApp Button Click",
      "WhatsApp Button Hover",
      "Search Box Typing",
      "Search Box Focus",
      "Search Box Enter/Submit",
      "Setting page Page View",
      "Power Page View",
      "Calculator Button Click",
      "Bluetooth Button Clicked",
      "Bluetooth Turned On",
      "Bluetooth Turned Off",
      "Theme Button Clicked",
      "Theme Set to Dark",
      "Theme Set to Light",
      "Setting Button Clicked",
      "Minimize Application",
      "Close Application from OneClick",
      "Power Option Button Clicked",
      "Restart Computer",
      "Shutdown Computer",
      "Lock Computer",
      "Hibernate Computer",
    ],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  properties: {
    type: Map,
    of: String,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
