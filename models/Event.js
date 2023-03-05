const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user_id: {
    type: String,
    ref: "User",
    as: "_id",
  },
  eventName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  properties: {
    type: Map,
    of: String | Object,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
