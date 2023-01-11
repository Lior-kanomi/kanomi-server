// Load the required packages
const express = require("express");
const nodemon = require("nodemon");
const dotenv = require("dotenv");
const cors = require("cors");

// Load the environment variables from the .env file
dotenv.config();

const path = require("path");
const buttonRoute = require("./routes/buttonRoute");

// Initial database connection
const db = require("./data/db");

// Create an express app
const app = express();

// Use the express.json() middleware to parse incoming request bodies
app.use(express.json());

app.use(cors());

// Set the port for the application
const port = process.env.PORT || 5000;

// Mount the routes to the express app
app.use("/api/button", buttonRoute);

// Define a catch-all route to handle invalid routes
app.use((req, res, next) => {
  res.status(404).render("error");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
