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
  try {
    const { distinct_id } = req.body;
    mixpanel.track_batch([req.body.MixpanelEventName], { distinct_id });
    res.status(200);
  } catch (e) {
    console.log("Error");
    res.status(400);
  }
};
