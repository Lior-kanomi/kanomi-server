const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connection established!');
});

mongoose.connection.on('error', (error) => {
  console.error(`MongoDB connection error: ${error}`);
  process.exit(-1);
});


