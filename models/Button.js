const mongoose = require('mongoose');

const buttonSchema = new mongoose.Schema({
  buttonName: {
     type:String,
     enum: ['SnippingToolButton','PowerOptionsButton','SettingsMenuButton',
     'SnippingToolButton','CalculatorButton','SnippingTool','KanomiSearchBar',
     'WhatsappWebButton','BluetoothButton','WeatherButton',
    'AmazonButton','EbayButton','MainAppBarBrowserButton',
  ],
  required: true,
  },
  counter: {
    type: Number,
    default: 0
  }
});

const Button = mongoose.model('Button', buttonSchema);

module.exports = Button;
