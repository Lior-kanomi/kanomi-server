const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  buttonName: {
    type:{
     type:String,
  required: true,
    },
  },
  counter: {
    type: Number,
    default: 0
  }
});

const Button = mongoose.model('Button', buttonSchema);

module.exports = Button;
