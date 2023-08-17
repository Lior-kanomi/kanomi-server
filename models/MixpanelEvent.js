const mongoose = require("mongoose");

const mixpanelEventSchema = new mongoose.Schema({
  Id: {
    type: String,
    ref: "User",
    as: "_id",
  },
  MixpanelEventName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  MixpanelErrorValue: {
    type: String,
  },
});

const MixpanelEvent = mongoose.model("MixpanelEvent", mixpanelEventSchema);

module.exports = MixpanelEvent;
