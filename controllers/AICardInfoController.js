const AICardInfo = require("../models/AICardInfo");

exports.getAICardsInfo = async (req, res) => {
  try {
    const card = await AICardInfo.find({});
    res
      .status(200)
      .json({ message: "AI card info fetched successfully", data: card });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAICardsInfoToLinksButtons = async () => {
  try {
    const AICardsInfo = await AICardInfo.find({});
    if (AICardsInfo.length > 0) {
      return AICardsInfo;
    }
    return [];
  } catch (error) {
    return [];
  }
};

exports.createAICardInfo = async (req, res) => {
  try {
    const { name, rating, icon, lightThemeIcon, url, hint } = req.body;
    console.log(name, rating, icon, lightThemeIcon, url, hint);
    const newCard = new AICardInfo({
      name,
      rating,
      icon,
      lightThemeIcon,
      url,
      hint
    });
    const createdCard = await AICardInfo.create(newCard);
    await createdCard.save();
    res
      .status(200)
      .json({ message: "AI card created successfully", data: createdCard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
