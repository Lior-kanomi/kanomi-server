// Load the required packages
const express = require('express');
const nodemon = require('nodemon');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute');
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors');
const openssl = require('openssl-nodejs');

const app = express();

// Disable SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Load the environment variables from the .env file
dotenv.config();

const db = require('./data/db');

// Create an express app
app.use(cors());
// Set the port for the application
const port = process.env.PORT || 5000;



// Mount the routes to the express app
app.use('/', (req,res) => res.status(200).json({message:"Success",data:[]}));
app.use('/api/users', userRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});