const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const {
      geo_location,
      device_type,
      operating_system_version,
      browser,
      error_log,
    } = req.body;
    if (
      !geo_location ||
      !device_type ||
      !operating_system_version ||
      !browser ||
      !error_log
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newUser = new User({
      geo_location,
      device_type,
      error_log,
      browser,
      operating_system_version,
    });

    const createdUser = await User.create(newUser);

    // If the User was successfully created, send a 200 OK response with the created User document
    res.status(200).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    // If there is an error, send a 500 error response
    res.status(500).send(error);
  }
};
