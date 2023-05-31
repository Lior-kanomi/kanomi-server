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

// Import routes
const linkButtonRoute = require("./routes/linkButtonRoute");
const nativeButtonRoute = require("./routes/nativeButtonRoute"); // The Native Buttons' route
const powerOptionButtonRoute = require("./routes/powerOptionButtonRoute"); // The Power Buttons' route
const settingOptionButtonRoute = require("./routes/settingOptionButtonRoute"); // The Setting Buttons' route
const menuButtonsRoute = require("./routes/menuButtonsRoute"); // The Menu Buttons' route
const eventRoute = require("./routes/eventRoute"); // The Events' route
const userRoute = require("./routes/userRoute"); // The Users' route
const AIOptionRoute = require("./routes/AIOptionButtonRoute"); // The AI Buttons route
const AICardRoute = require("./routes/AICardRoute"); // The AI Cards route
const applicationVarsRoute = require("./routes/applicationVars"); // The Application Variables route
const autoSuggestRoute = require("./routes/autoSuggestRoute"); // The autoSuggest Variables route
const googleTrendsRoute = require("./routes/googleTrendsRoute"); // The autoSuggest Variables route

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
app.use("/api/user", userRoute);
app.use("/api/applicationVars", applicationVarsRoute);
app.use("/api/autoSuggest", autoSuggestRoute);
app.use("/api/googleTrends", googleTrendsRoute);

// Define a catch-all route to handle invalid routes
// app.use((req, res, next) => {
//   res.status(404).render("error");
// });

// app.get("/", async (req, res) => {
//   const url = `https://trends.google.com/trends/api/dailytrends?hl=en-US&ed=${new Date()
//     .toISOString()
//     .slice(0, 10)
//     .replace(/-/g, "")}&geo=US&ns=15`;

//   try {
//     const response = await axios.get(url);
//     const content = response.data;
//     const startIndex = content.indexOf("[");
//     const endIndex = content.lastIndexOf("]");

//     if (response.status === 200) {
//       const responseObject = JSON.parse(
//         content.slice(startIndex, endIndex + 1)
//       );
//       if (responseObject.length == 0) {
//         res.send("No trends found");
//         return;
//       }
//       const googleTrendsRandomTitle = getRandomArticleTitle(responseObject);
//       res.send(googleTrendsRandomTitle);
//     } else {
//       res.send("Search with OneClick");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     res.send("Search with OneClick");
//   }
// });

// function getRandomArticleTitle(responseObject) {
//   const trendingSearchesDays = responseObject[0]?.trendingSearches;

//   if (!trendingSearchesDays || trendingSearchesDays.length === 0) {
//     return "No trends found";
//   }

//   const randomDayIndex = Math.floor(
//     Math.random() * trendingSearchesDays.length
//   );
//   const trendingSearches = trendingSearchesDays[randomDayIndex];

//   if (!trendingSearches || trendingSearches.length === 0) {
//     return "No trends found";
//   }

//   const randomSearchIndex = Math.floor(Math.random() * trendingSearches.length);
//   const title = trendingSearches?.title?.query;

//   return title;
// }

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
