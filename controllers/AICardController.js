const AICard = require("../models/AICard");

// Create a new user and save it to the database
exports.createAICard = async (req, res) => {
  try {
    const aiCard = await AICard.findOne({
      cardName: req.body.cardName,
    });
    if (!aiCard) {
      const { isHotWebsite, description, cardName, categories } = req.body;
      const newCard = new AICard({
        isHotWebsite,
        description,
        cardName,
        categories,
      });
      const createdCard = await aiCard.create(newCard);
      res.status(200).json({
        message: "AI option button created successfully",
        data: createdCard,
      });
    } else {
      newCard.isHotWebsite = req.body.isHotWebsite;
      newCard.cardName = req.body.cardName;
      newCard.categories = req.body.categories;
      const updatedCard = await AICard.save();
      res.status(200).json({
        message: "AI option button updated successfully",
        data: updatedCard,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
