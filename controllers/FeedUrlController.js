const FeedUrl = require("../models/FeedUrl");
// Create a AI card and save it to the database

exports.createFeedUrl = async (req, res) => {
  try {
    const feedUrl = await FeedUrl.findOne({
      url: req.body.cardName,
    });
    if (!feedUrl) {
      const { url } = req.body;
      const newFeed = new FeedUrl({
        url,
      });
      const createdFeed = await FeedUrl.create(newFeed);
      res.status(200).json({
        message: "Feed url created successfully",
        data: createdFeed,
      });
    } else {
      newFeed.url = req.body.url;
      const updatedFeed = await FeedUrl.save();
      res.status(200).json({
        message: "Feed url button updated successfully",
        data: updatedFeed,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user and save it to the database
exports.getFeedUrl = async (req, res) => {
  try {
    const { query } = req.params;
    const searchProvider = process.env.FEED;
    const feed = await FeedUrl.findOne();
    console.log(feed?.url || "field is missing");
    return res.redirect(302, `${searchProvider}${query}`);
  } catch (err) {
    return res.status(500).json({ message: err.message, data: [] });
  }
};

exports.getApplicationVariableFeed = async () => {
  try {
    const ApplicationVariableName = "FeedUrl"; // The feed.
    const feedsUrl = await FeedUrl.find();
    if (!feedsUrl.length) {
      return { message: "Feeds collection is empty", data: null };
    }
    const randomIndex = Math.floor(Math.random() * feedsUrl.length);
    const ApplicationVariableValue = feedsUrl[randomIndex].url;
    return {
      message: "success",
      data: {
        ApplicationVariableName,
        ApplicationVariableValue,
      },
    };
  } catch (err) {
    return { message: "Connection error", data: null };
  }
};
