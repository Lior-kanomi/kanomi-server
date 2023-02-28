const User = require("../models/User");

const logError = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.body.properties);
    if (req.body.properties.Error) {
      const userId = req.body.user._id;
      const errorMessage = req.body.properties.Error.message;

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
