const Event = require("../models/Button");

// Create a new user and save it to the database
exports.createEvent = async (req, res) => {
  Event.findOne({ eventName: req.body.eventName }, (error, event) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!event) {
      const { properties, type } = req.body;
      const newEvent = new Event({ properties, date, type });
      Event.create(newEvent)
        .then((createdEvent) => {
          // If the Event was successfully created, send a 200 OK response with the created Button document
          res.status(200).json({
            message: "Event created successfully",
            data: createdEvent,
          });
        })
        .catch((error) => {
          // If there is an error, send a 500 error response
          res.status(500).send(error);
        });
    } else {
      event.save((error) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        res
          .status(200)
          .json({ message: "Event created successfully", data: event });
      });
    }
  });
};
