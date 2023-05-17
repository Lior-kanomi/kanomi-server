const axios = require("axios");

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

exports.getTrendsData = async (req, res) => {
  try {
    const url = `https://trends.google.com/trends/api/dailytrends?hl=en-US&ed=${DateTime.now().toFormat(
      "yyyyMMdd"
    )}&geo=US&ns=1`;

    const response = await axios.get(url);
    let content = response.data;
    content = content.substring(5).trimStart(")]}',\r\n");

    if (response.status === 200) {
      const responseObject = JSON.parse(content);
      if (!responseObject["default"]) {
        res.status(200).json({ message: DEFUALT_MESSAGE });
      } else {
        const googleTrendsRandomTitle = getRandomArticleTitle(responseObject);
        res.status(200).json({ message: googleTrendsRandomTitle });
      }
    } else {
      res.status(200).json({ message: DEFUALT_MESSAGE });
    }
  } catch (error) {
    res.status(500).json({ message: DEFUALT_MESSAGE });
  }
};
