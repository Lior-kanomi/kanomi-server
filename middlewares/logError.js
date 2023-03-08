const User = require("../models/User");

const logError = async (req, res, next) => {
  try {
    const user = req.body[0];
    if (user.properties.Error) {
      const userId = user.user_id;
      const errorMessage = user.properties.Error.message;

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

module.exports = logError;
