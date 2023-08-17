const User = require("../models/User");

const mixpanelLogger = async (req, res, next) => {
  try {
    const mixpanelEvent = req.body; // Assuming the Mixpanel event data is sent in the request body

    if (mixpanelEvent.MixpanelErrorValue) {
      const userId = mixpanelEvent.Id;
      const errorMessage = mixpanelEvent.MixpanelErrorValue;

      await User.updateOne(
        { _id: userId },
        {
          $push: { errors_log: { message: errorMessage } },
        }
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = mixpanelLogger;
