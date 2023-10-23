const MixpanelEvent = require("../models/MixpanelEvent"); // Assuming the path to your model is correct
// Controller function to add a new Mixpanel event
exports.addMixpanelEvent = async (req, res) => {
  try {
    const eventData = req.body; // Assuming you're sending the event data in the request body

    // Create a new MixpanelEvent document using the model
    const newEvent = new MixpanelEvent(eventData);

    // Save the new event to the database
    await newEvent.save();

    res
      .status(201)
      .json({ message: "Mixpanel event added successfully", data: newEvent });
  } catch (error) {
    console.error("Error adding Mixpanel event:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the Mixpanel event" });
  }
};

// Controller function to add a new Mixpanel event
exports.addExtensionEvents = async (req, res) => {
  const mixpanel = require("mixpanel").init(process.env.MIXPANEL_TOKEN);
  const { events, distinct_id } = req.body;

  try {
    if (events.length === 0)
      return res.status(200).send("No events to process.");

    const formattedEvents = events.map((eventString) => {
      const { MixpanelEventName } = eventString;
      return {
        event: MixpanelEventName,
        properties: {
          distinct_id: distinct_id,
          time: Math.floor(Date.now() / 1000), // time should be in seconds since epoch
          // ...other event properties
        },
      };
    });
    console.log(formattedEvents);
    mixpanel.track_batch(formattedEvents, (error) => {
      if (error) {
        console.log(formattedEvents, error);

        console.log("Error:", error);
        return res.status(400).send(error.message);
      } else {
        console.log(formattedEvents, "success");

        return res
          .status(200)
          .json({ data: {}, message: "Events tracked successfully." });
      }
    });
  } catch (e) {
    console.log("Error:", e);
    res.status(400).send(e.message);
  }
};
