const axios = require('axios');
const MixpanelEvent = require("../models/MixpanelEvent");
const MixpanelUser = require("../models/MixpanelUser"); // Assuming the path to your model is correct
 // Assuming the path to your model is correct
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

exports.postIPController = async (req, res) => {
    const { IP,Id } = req.body; // Assuming the IP is sent in the request body
    const trackingInfo = {ip:IP,user_id:Id}

    console.log(trackingInfo);

    try {
        const response = await axios.post('https://www.mulapo.com/report_install', trackingInfo );
        
        // Check if the response status is 200
        if (response.status === 200) {
            // Handle the successful response
          return  res.status(200).json({ message: "Pixel sent successfully from the server", data: trackingInfo });
        }
         return  res.status(200).json({ message: "Pixel sent successfully without getting any 200 status for the request", data: trackingInfo });
        
    } catch (error) {
        // Handle errors in sending the request
        console.error('Error in sending POST request:', error);
        res.status(500).json({ message: `Error in sending POST request:', ${error}`, data: trackingInfo });
    }
};

exports.addMixpanelUser = async (req, res) => {
  try {
    const userData = req.body;

    // Check if a user with the same Id already exists
    const existingUser = await MixpanelUser.findOne({ Id: userData.Id });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // Create a new MixpanelUser document using the model
    const newUser = new MixpanelUser(userData);

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "Mixpanel user added successfully", data: newUser });
  } catch (error) {
    console.error("Error adding Mixpanel user:", error);
    res.status(500).json({ error: "An error occurred while adding the Mixpanel user" });
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
    console.log("this is the formattedEvents", formattedEvents);
    mixpanel.track_batch(formattedEvents, (error) => {
      if (error) {
        console.log(
          "An error inside the track batch callback error",
          error.message
        );
        return res.status(400).json({ message: error.message });
      } else {
        console.log(formattedEvents, "success");

        return res
          .status(200)
          .json({ data: {}, message: "Events tracked successfully." });
      }
    });
  } catch (e) {
    console.log("Error in the catch block", e);
    res.status(400).json({ message: e.message });
  }
};
