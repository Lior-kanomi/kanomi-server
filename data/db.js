// Import required modules
const mongoose = require("mongoose");
require("dotenv").config();

// Set mongoose to throw errors instead of warnings
mongoose.set("strictQuery", true);

// Determine the database URI based on the environment
const isDev = process.env.NODE_ENV !== "production";
const dbURI = isDev ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI;

// Connect to the MongoDB database using the URI
mongoose.connect(dbURI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

// Log a message when the connection is established
mongoose.connection.on("connected", () => {
 console.log("MongoDB connection established!");
});