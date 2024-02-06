// Load the required packages
const express = require("express");
const nodemon = require("nodemon");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
// Load the environment variables from the .env file
dotenv.config();

// Initial database connection
const db = require("./data/db");

// New comment

// Import routes
const linkButtonRoute = require("./routes/linkButtonRoute");
const nativeButtonRoute = require("./routes/nativeButtonRoute"); // The Native Buttons' route
const powerOptionButtonRoute = require("./routes/powerOptionButtonRoute"); // The Power Buttons' route
const settingOptionButtonRoute = require("./routes/settingOptionButtonRoute"); // The Setting Buttons' route
const menuButtonsRoute = require("./routes/menuButtonsRoute"); // The Menu Buttons' route
const eventRoute = require("./routes/eventRoute"); // The Events' route
const mixpanelEventRoute = require("./routes/mixpanelEventRoute"); // The Events' route
const userRoute = require("./routes/userRoute"); // The Users' route
const AIOptionRoute = require("./routes/AIOptionButtonRoute"); // The AI Buttons route
const AICardRoute = require("./routes/AICardRoute"); // The AI Cards route
const applicationVarsRoute = require("./routes/applicationVars"); // The Application Variables route
const autoSuggestRoute = require("./routes/autoSuggestRoute"); // The autoSuggest Variables route
const googleTrendsRoute = require("./routes/googleTrendsRoute"); // The google trends route
const feedUrlRoute = require("./routes/feedUrlRoute"); // The feedUrl route
const ABTestingRoute = require("./routes/ABTestingRoute"); // The feedUrl route
const timerIntervalForFocusCheckRoute = require("./routes/timerIntervalForFocusCheckRoute"); //interval value for focus check
const timerIntervalForIdleRoute = require("./routes/timerIntervalForIdleRoute"); //interval value for focus check
const bannerRoute = require("./routes/bannerRoute"); // Banner extension
const AICardInfoRoute = require("./routes/AICardInfoRoute"); // AICardInfoRoute extension

// This is for you DOTAN
const mixpanelUsertRoute = require("./routes/mixpanelUserRoute"); // The Mixpanel users' route

// Browser Chrome extension
const userAgentRoute = require("./routes/UserAgentRoute"); // The feedUrl route

// Create an express app
const app = express();

app.set("view engine", "ejs");

// Use the express.json() middleware to parse incoming request bodies
app.use(express.json());

app.use(cors());

// Set the port for the application
const port = process.env.PORT || 5000;

// Mount the routes to the express app
app.use("/api/linkButton", linkButtonRoute);
app.use("/api/nativeButton", nativeButtonRoute);
app.use("/api/powerOptionButton", powerOptionButtonRoute);
app.use("/api/settingOptionButton", settingOptionButtonRoute);
app.use("/api/menuButton", menuButtonsRoute);
app.use("/api/AIButton", AIOptionRoute);
app.use("/api/AICard", AICardRoute);
app.use("/api/event", eventRoute);
app.use("/api/mixpanelEvent", mixpanelEventRoute);
app.use("/api/mixpanelUser", mixpanelUsertRoute);
app.use("/api/user", userRoute);
app.use("/api/applicationVars", applicationVarsRoute);
app.use("/api/autoSuggest", autoSuggestRoute);
app.use("/api/googleTrends", googleTrendsRoute);
app.use("/api/Feed", feedUrlRoute);
app.use("/api/userAgent", userAgentRoute);
app.use("/api/ab-test", ABTestingRoute);
app.use("/api/timerIntervalForFocusCheck", timerIntervalForFocusCheckRoute);
app.use("/api/timerIntervalForIdle", timerIntervalForIdleRoute);
app.use("/api/bannerRoute", bannerRoute);
app.use("/api/AICardInfoRoute", AICardInfoRoute);

//Mount the 'dev' routes to the express app
app.use("/dev/linkButton", linkButtonRoute);
app.use("/dev/nativeButton", nativeButtonRoute);
app.use("/dev/powerOptionButton", powerOptionButtonRoute);
app.use("/dev/settingOptionButton", settingOptionButtonRoute);
app.use("/dev/menuButton", menuButtonsRoute);
app.use("/dev/AIButton", AIOptionRoute);
app.use("/dev/AICard", AICardRoute);
app.use("/dev/event", eventRoute);
app.use("/dev/mixpanelEvent", mixpanelEventRoute);
app.use("/dev/mixpanelUser", mixpanelUsertRoute);
app.use("/dev/user", userRoute);
app.use("/dev/applicationVars", applicationVarsRoute);
app.use("/dev/autoSuggest", autoSuggestRoute);
app.use("/dev/googleTrends", googleTrendsRoute);
app.use("/dev/Feed", feedUrlRoute);
app.use("/dev/userAgent", userAgentRoute);
app.use("/dev/ab-test", ABTestingRoute);
app.use("/dev/timerIntervalForFocusCheck", timerIntervalForFocusCheckRoute);
app.use("/dev/timerIntervalForIdle", timerIntervalForIdleRoute);

// app.get("/api/test",(req, res) => {
//   const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//   const geo = geoip.lookup(ip);

//   if (geo && geo.country === 'IL') {
//     return res.status(403).send('Access denied');
//   }

// });

// Define a catch-all route to handle invalid routes
// app.use((req, res, next) => {
//   res.status(404).render("error");
// });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
