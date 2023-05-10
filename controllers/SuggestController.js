// Create a new user and save it to the database
const axios = require("axios");

exports.getUserSuggestions = async (req, res) => {
  try {
    const langCode = "iw";
    const countryCode = "us";
    const requestUrl = `https://www.google.com/complete/search?q=${req.body.query}&hl=${req.body.langCode}&client=chrome&gl=${req.body.countryCode}`;
    const googleRes = await axios.get(requestUrl);
    res.status(200).send(googleRes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
