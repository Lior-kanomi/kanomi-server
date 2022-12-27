const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  buttonName: {
    type:{
     type:String,
     enum: ['SnippingToolButton','PowerOptionsButton','SettingsMenuButton',
     'SnippingToolButton','CalculatorButton','SnippingTool','KanomiSearchBar',
     'WhatsappWebButton','BluetoothButton','WeatherButton',
    'AmazonButton','EbayButton','MainAppBarBrowserButton',
  ],
    },
    required: true,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
  },
  counter: {
    type: Number,
    default: 0
  }
});

const Button = mongoose.model('Button', buttonSchema);

module.exports = Button;
