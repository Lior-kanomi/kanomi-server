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
exports.testUserIdFeedUrl = async (req, res) => {
  try {
    const { query, userId, element } = req.params;
    const encodedQuery = query ?? encodeURI(query);
    const mixpanel = require("mixpanel").init(process.env.MIXPANEL_TOKEN);
    const searchProvider = process.env.FEED;

    // Find the document
    const feed = await FeedUrl.findOne();

    if (feed) {
      // Increment the counter
      feed.counter += 1;
      await feed.save();

      console.log(feed.url || "field is missing");
      res.redirect(302, `${searchProvider}${query}`);
    } else {
      // Handle the case where the document is not found
      res.redirect(302, `https://search.yahoo.com/search?p=${query}`);
    }
    const properties = {
      eventProperty: `User search through ${element} with the query '${encodedQuery}`,
      distinct_id: userId,
      time: Math.floor(Date.now() / 1000), // time should be in seconds since epoch
      // ...other event properties
    };
    mixpanel.track("Search", properties, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    return res.redirect(302, `https://search.yahoo.com/search?p=${query}`);
  }
};

// Create a new user and save it to the database
exports.getFeedUrl = async (req, res) => {
  try {
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // const geo = geoip.lookup(ip);

    // if (geo && geo.country === 'IL') {
    //   return res.status(403).send('Access denied');
    // }

    const { query } = req.params;
    const searchProvider = process.env.FEED;

    // Find the document
    const feed = await FeedUrl.findOne();

    if (feed) {
      // Increment the counter
      feed.counter += 1;
      await feed.save();

      console.log(feed.url || "field is missing");
      return res.redirect(302, `${searchProvider}${query}`);
    } else {
      // Handle the case where the document is not found
      return res.redirect(302, `https://www.bing.com/search?q=${query}`);
    }
  } catch (err) {
    return res.redirect(302, `https://www.bing.com/search?q=${query}`);
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
