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

exports.getTrendsData = async (req, res) => {
  try {
    const url = `https://trends.google.com/trends/api/dailytrends?hl=en-US&ed=${DateTime.now().toFormat(
      "yyyyMMdd"
    )}&geo=US&ns=1`;

    const response = await axios.get(url);
    console.log(response);
    let content = response.data;
    console.log(content);
    console.log(content);

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

function getRandomArticleTitle(response) {
  // Select a random trending search
  const trendingSearch = _.chain(response["default"].trendingSearchesDays)
    .filter((day) => day.trendingSearches && day.trendingSearches.length)
    .flatMap((day) => day.trendingSearches)
    .filter((search) => search.articles && search.articles.length)
    .orderBy(() => uuidv4())
    .first()
    .value();

  // Check if trendingSearch is null
  if (!trendingSearch) {
    return null;
  }

  // Select a random article from the trending search
  const article = _.chain(trendingSearch.articles)
    .orderBy(() => uuidv4())
    .first()
    .value();

  // If the article title is not null, return it
  if (article && article.title) {
    return (
      regex.replace(article.title, /(?<=\w#)\d+|&#39;|[!@$%^&*()]/g, "") + "..."
    );
  }

  // If article is null or article title is null, call the method recursively
  return getRandomArticleTitle(response);
}
