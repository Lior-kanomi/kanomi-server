// Create a new user and save it to the database
const axios = require("axios");
const circularJSON = require("json-circular-stringify");
exports.getUserSuggestions = async (req, res) => {
  try {
    const langCode = "iw";
    const countryCode = "us";
    const requestUrl = `https://www.google.com/complete/search?q=${req.body.query}&hl=${req.body.langCode}&client=chrome&gl=${req.body.countryCode}`;
    const googleRes = await axios.get(requestUrl);
    const data = googleRes.json();
    const jsonString = circularJSON.stringify(data);
    res.json(jsonString);
    res.status(200).json(googleRes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
