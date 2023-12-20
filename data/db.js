const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

const isDev = process.env.NODE_ENV !== "production";
const dbURI = isDev ? process.env.MONGODB_URI_DEV : process.env.MONGODB_URI;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established!");
});
