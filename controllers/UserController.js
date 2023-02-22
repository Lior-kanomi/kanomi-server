const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { _id, operating_system_version } = req.body;
    if (!_id || !operating_system_version) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newUser = new User({
      _id,
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
