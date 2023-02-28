const User = require("../models/user");

const logError = async (req, res, next) => {
  try {
    if (req.body.properties.Error) {
      const userId = req.body.user._id;
      const errorMessage = req.error.message;

      await User.updateOne(
        { _id: userId },
        {
          $push: { error_logs: { message: errorMessage } },
        }
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = logError;
