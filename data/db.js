const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established!");
});

mongoose.connection.on("error", (error) => {
  console.error(`MongoDB connection error: ${error}`);
  process.exit(-1);
});

//New Unhandled exceptions method
mongoose.connection.on("disconnected", (error) => {
  if (error) {
    console.error(`MongoDB connection disconnected: ${error}`);
    process.exit(-1);
  } else {
    console.log("MongoDB connection disconnected through app termination");
    process.exit(0);
  }
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});
