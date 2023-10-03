const Event = require("../models/Event");
const User = require("../models/User");

exports.createEvent = async (req, res, next) => {
  try {
    const events = req.body;

    // validate each event in the array
    const validEvents = [];
    events.forEach((event) => {
      const { user_id, eventName, properties, date } = event;
      const newEvent = new Event({ user_id, eventName, properties, date });
      const validationError = newEvent.validateSync();
      if (validationError) {
        throw new Error(validationError);
      }
      validEvents.push(newEvent);
    });

    // save all the new events to the database
    const savedEvents = await Event.insertMany(validEvents);

    // add the new events to the corresponding user's events array
    const userIds = events.map((event) => event.user_id);
    await User.updateMany(
      { _id: { $in: userIds } },
      { $push: { events: { $each: savedEvents.map((event) => event._id) } } }
    );

    res
      .status(201)
      .json({ message: "Events created successfully", events: savedEvents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteEvents = async (req, res, next) => {
  try {
    const result = await Event.deleteMany({});
    res.json({
      message: `${result.deletedCount} events deleted successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting events" });
  }
};
