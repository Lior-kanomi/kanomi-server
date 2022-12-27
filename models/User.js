const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Amazon','Ebay','WhatsApp',''],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  fullName: {
    type: String,
    required: true,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
