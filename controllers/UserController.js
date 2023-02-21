const User = require("../models/User");

// Create a new user and save it to the database
// exports.createUser = async (req, res) => {
//   console.log("Inside the User's creation block");
//   const {
//     geo_location,
//     device_type,
//     operating_system_version,
//     browser,
//     error_log,
//   } = req.body;
//   console.log(
//     `destruction of the req.body ${geo_location} ${device_type} ${operating_system_version} ${browser} ${error_log}`
//   );
//   const newUser = new User({
//     geo_location,
//     device_type,
//     error_log,
//     browser,
//     operating_system_version,
//   });
//   console.log(`New event has been created ${newUser}`);

//   User.create(newUser)
//     .then((createdUser) => {
//       console.log(`Event has been stored in DB ${createdUser}`);
//       // If the Event was successfully created, send a 200 OK response with the created Button document
//       res.status(200).json({
//         message: "Event created successfully",
//         data: createdUser,
//       });
//     })
//     .catch((error) => {
//       // If there is an error, send a 500 error response
//       res.status(500).send(error);
//     });
// };

exports.createUser = async (req, res) => {
  try {
    console.log("Inside the User's creation block");

    const {
      geo_location,
      device_type,
      operating_system_version,
      browser,
      error_log,
    } = req.body;

    console.log(
      `destruction of the req.body ${geo_location} ${device_type} ${operating_system_version} ${browser} ${error_log}`
    );

    if (
      !geo_location ||
      !device_type ||
      !operating_system_version ||
      !browser ||
      !error_log
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const newUser = new User({
      geo_location,
      device_type,
      error_log,
      browser,
      operating_system_version,
    });

    console.log(`New user has been created ${newUser}`);

    const createdUser = await User.create(newUser);

    console.log(`User has been stored in DB ${createdUser}`);

    // If the User was successfully created, send a 200 OK response with the created User document
    res.status(200).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    // If there is an error, send a 500 error response
    res.status(500).send(error);
  }
};
