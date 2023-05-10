// Create a new user and save it to the database
exports.getUserSuggestions = async (req, res) => {
  try {
    const langCode = "iw";
    const countryCode = "us";
    const requestUrl = `https://www.google.com/complete/search?q=${req.body.query}&hl=${req.body.langCode}&client=chrome&gl=${req.body.countryCode}`;
    const googleRes = await fetch(requestUrl);
    res.status(200).json(googleRes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
