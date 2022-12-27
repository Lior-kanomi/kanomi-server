const User = require('../models/user');

// Get all users from the database
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: 'Users retrieved successfully', data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

// Create a new user and save it to the database
exports.createUser = async (req, res) => {
      // Check if user already exists in the database
  const existingUser = await User.findOne({ name, location });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
// Save user to the database
  const user = new User({ name, location });
  try {
    await user.save();
    res.status(200).json({ message: 'User saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
