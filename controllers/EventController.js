const Event = require("../models/Event");
const User = require("../models/User");

// // Create a new user and save it to the database
// exports.createEvent = async (req, res) => {
//   console.log("fired!", req.body.eventName);
//   Event.findOne({ eventName: req.body.eventName }, (error, event) => {
//     console.log("The event is: ", event);
//     if (error) {
//       return res.status(500).json({ message: error.message });
//     }
//     if (!event) {
//       console.log("Inside the event's creation block");
//       const { properties, eventName } = req.body;
//       console.log(`destruction of the req.body ${properties} ${eventName}`);
//       const newEvent = new Event({ properties, eventName });
//       console.log(`New event has been created ${newEvent}`);

//       Event.create(newEvent)
//         .then((createdEvent) => {
//           console.log(`Event has been stored in DB ${newEvent}`);
//           // If the Event was successfully created, send a 200 OK response with the created Button document
//           res.status(200).json({
//             message: "Event created successfully",
//             data: createdEvent,
//           });
//         })
//         .catch((error) => {
//           // If there is an error, send a 500 error response
//           res.status(500).send(error);
//         });
//     } else {
//       event.save((error) => {
//         if (error) {
//           return res.status(500).json({ message: error.message });
//         }
//         res
//           .status(200)
//           .json({ message: "Event created successfully", data: event });
//       });
//     }
//   });
// };

// create a new event and save it to the corresponding user's events array
exports.createEvent = async (req, res, next) => {
  try {
    console.log(req.body);

    const { user_id, eventName, properties, date } = req.body;

    // create the new event
    const newEvent = new Event({ user_id, eventName, properties, date });

    console.log(req.body);
    // save the new event to the database
    await newEvent.save();

    // add the new event to the corresponding user's events array
    await User.findByIdAndUpdate(user_id, { $push: { events: newEvent._id } });

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
