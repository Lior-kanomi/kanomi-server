const axios = require("axios");

exports.getGoogleTrends = async (req, res) => {
  const url = `https://trends.google.com/trends/api/dailytrends?hl=en-US&date=now 1-m&geo=US&ns=100`;

  try {
    const response = await axios.get(url);
    const content = response.data;
    const startIndex = content.indexOf("[");
    const endIndex = content.lastIndexOf("]");

    if (response.status === 200) {
      const responseObject = JSON.parse(
        content.slice(startIndex, endIndex + 1)
      );
      if (responseObject.length === 0) {
        return getGoogleTrends(req, res); // Recursively call the method
      }
      const googleTrendsRandomTitle = getRandomArticleTitle(responseObject);
      if (!googleTrendsRandomTitle) {
        return getGoogleTrends(req, res); // Recursively call the method
      }
      res
        .status(200)
        .json({ message: "success", data: googleTrendsRandomTitle });
    } else {
      res.status(400).json({ message: "failure", data: [] });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "failure", data: [] });
  }
};

const getRandomArticleTitle = (responseObject) => {
  const randomTrendingSearcheIndex = Math.floor(
    Math.random() * responseObject.length
  );

  const trendingSearchesDays =
    responseObject[randomTrendingSearcheIndex]?.trendingSearches;

  if (!trendingSearchesDays || trendingSearchesDays.length === 0) {
    return null;
  }

  const randomDayIndex = Math.floor(
    Math.random() * trendingSearchesDays.length
  );
  const trendingSearches = trendingSearchesDays[randomDayIndex];

  if (!trendingSearches || trendingSearches.length === 0) {
    return null;
  }
  const title = trendingSearches?.title?.query;

  return title;
};
