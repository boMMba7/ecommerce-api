const User = require("../models/User");
const { userValidator } = require("../config/dataValidator");

//  WARNING: This is a simple demonstration of register functionality.
//  If you intend to use this code in a production environment,
//  please replace the registration mechanism with a robust crypto library for better security.
const handleNewUser = async (req, res) => {
  try {
    const { user } = req.body;
    const { error } = userValidator(user);

    if (error) return res.status(400).json({ message: error.message });

    const { username, email, password, address } = user;

    // Check if name and email alredy exist
    const duplicateName = await User.findOneUser({ username });
    if (duplicateName)
      return res.status(400).json({ message: "Name alredy exist" });
    const duplicateEmail = await User.findOneUser({ email });
    if (duplicateEmail)
      return res.status(400).json({ message: "Email alredy exist" });

    // encripting the password    :)
    const encriptedPassword = `EncriptedPassword(${password})`;

    const validUser = { username, email, password: encriptedPassword, address };

    User.createUser(validUser, (err, userCreated) => {
      if (err) return res.status(400).json({ message: err.message });

      res.status(200).json({ message: "User created succefuly" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { handleNewUser };
