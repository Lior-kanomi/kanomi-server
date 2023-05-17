const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { default: _ } = require("lodash");
const regex = require("regex");

exports.getUserSuggestions = async (req, res) => {
  try {
    const langCode = "en";
    const countryCode = "us";
    console.log(req.params.query);
    console.log(req.param.query);

    const requestUrl = `https://www.google.com/complete/search?q=${req.params.query}&hl=${langCode}&client=chrome&gl=${countryCode}`;
    const googleRes = await axios.get(requestUrl);
    res.status(200).json({ message: "success", data: googleRes.data[1] });
  } catch (error) {
    res.status(500).json({ message: "failure", data: [] });
  }
};
