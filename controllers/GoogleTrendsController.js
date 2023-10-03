const axios = require("axios");
const googleTrendsAPI = require("google-trends-api");

// exports.getGoogleTrends = async (req, res) => {
//   const url = `https://trends.google.com/trends/api/dailytrends?hl=en-US&date=now 1-m&geo=US&ns=100`;

//   try {
//     const response = await axios.get(url);
//     const content = response.data;
//     const startIndex = content.indexOf("[");
//     const endIndex = content.lastIndexOf("]");

//     if (response.status === 200) {
//       const responseObject = JSON.parse(
//         content.slice(startIndex, endIndex + 1)
//       );
//       if (responseObject.length === 0) {
//         return getGoogleTrends(req, res); // Recursively call the method
//       }
//       const googleTrendsRandomTitle = getRandomArticleTitle(responseObject);
//       if (!googleTrendsRandomTitle) {
//         return getGoogleTrends(req, res); // Recursively call the method
//       }
//       return res
//         .status(200)
//         .json({ message: "success", data: googleTrendsRandomTitle });
//     } else {
//       return getGoogleTrends(req, res);
//     }
//   } catch (error) {
//     return getGoogleTrends(req, res);
//   }
// };

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

exports.getGoogleTrends = async (req, res) => {
  try {
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - 8); // Subtract 4 days
    currentDate.setDate(currentDate.getDate() - 4);
    const options = {
      trendDateStart: startDate,
      trendDateEnd: currentDate,
      geo: "US",
      hl: "en-US",
      category: "Anime & Manga",
      num: 100,
    };

    const results = await googleTrendsAPI.dailyTrends(options);
    const trends = JSON.parse(results);

    if (trends.default && trends.default.trendingSearchesDays) {
      const trendingSearchesDays = trends.default.trendingSearchesDays;
      const randomDayIndex = Math.floor(
        Math.random() * trendingSearchesDays.length
      );
      const randomDay = trendingSearchesDays[randomDayIndex];

      if (randomDay && randomDay.trendingSearches) {
        const trendingSearches = randomDay.trendingSearches;
        const randomSearchIndex = Math.floor(
          Math.random() * trendingSearches.length
        );
        const randomSearch = trendingSearches[randomSearchIndex];

        if (randomSearch && randomSearch.title && randomSearch.title.query) {
          const query = randomSearch.title.query;
          res.status(200).json({ message: "success", data: query });
          return;
        }
      }
    }

    res.status(500).json({ message: "failure", data: "No trends found" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "failure", data: [] });
  }
};
