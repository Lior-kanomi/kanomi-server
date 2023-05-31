const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

const isDev = process.env.NODE_ENV !== "production";
const dbURI = isDev
  ? "mongodb://localhost:27017/test"
  : process.env.MONGODB_URI;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established!");
});
