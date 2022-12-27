// Load the required packages
const express = require('express');
const nodemon = require('nodemon');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");

const buttonRoute = require("./routes/buttonRoute");

// Load the environment variables from the .env file
dotenv.config();

const app = express();

// Initial database connection
const db = require("./data/db");


// Create an express app
app.use(cors());
// Set the port for the application
const port = process.env.PORT || 5000;

// Mount the routes to the express app
app.use('/api/button',buttonRoute);



// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});