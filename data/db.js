const mongoose = require("mongoose");

console.log("Initiating Mongo");

mongoose.set("strictQuery", true);

const isDev = process.env.NODE_ENV !== "production";
const dbURI = isDev
  ? "mongodb://localhost:27017/test"
  : process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established!");
});

// mongoose.connection.on("error", (error) => {
//   console.error(`MongoDB connection error: ${error}`);
//   process.exit(-1);
// });

// //New Unhandled exceptions method
// mongoose.connection.on("disconnected", (error) => {
//   if (error) {
//     console.error(`MongoDB connection disconnected: ${error}`);
//     process.exit(-1);
//   } else {
//     console.log("MongoDB connection disconnected through app termination");
//     process.exit(0);
//   }
// });

// // Handle SIGINT event for graceful shutdown
// process.on("SIGINT", (err) => {
//   if (err) {
//     console.error(err);
//   }
//   connection.close(() => {
//     console.log("MongoDB connection closed due to app termination");
//     process.exit(0);
//   });
// });
