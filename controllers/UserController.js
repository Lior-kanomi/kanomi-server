const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { operating_system_version, browser, _id } = req.body;
    if (!browser || !operating_system_version || !_id) {
      return res.status(400).json({ message: "Missing fields" });
    }
    console.log(
      `After the if statement`,
      browser,
      operating_system_version,
      _id
    );
    const newUser = new User({
      browser,
      operating_system_version,
      _id,
    });

    console.log(
      _id,
      `Before the create of the User`,
      browser,
      operating_system_version
    );
    const createdUser = await User.create(newUser);
    console.log(createdUser);
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

exports.addUserError = async (req, res) => {
  try {
    console.log(req.body);
    const { _id } = req.body;
    if (!_id || !operating_system_version) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const newUser = new User({
      _id,
      operating_system_version,
    });

    console.log(`Before the create of the User`, _id, operating_system_version);
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

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    // If the User was successfully created, send a 200 OK response with the created User document
    res.status(200).json({
      message: "User created successfully",
      data: users,
    });
  } catch (error) {
    // If there is an error, send a 500 error response
    res.status(500).json({ message: error.message, data: [] });
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    const result = await User.deleteMany({});
    res.json({
      message: `${result.deletedCount} users deleted successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting events" });
  }
};
