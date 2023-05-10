// Create a new user and save it to the database
const { fetch } = require("undici");
const circularJSON = require("json-circular-stringify");
exports.getUserSuggestions = async (req, res) => {
  try {
    const langCode = "iw";
    const countryCode = "us";
    const requestUrl = `https://www.google.com/complete/search?q=${req.body.query}&hl=${req.body.langCode}&client=chrome&gl=${req.body.countryCode}`;
    const googleRes = await fetch(requestUrl);
    console.log(googleRes);
    const data = googleRes.json();
    console.log(data);
    res.status(200).json(googleRes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
