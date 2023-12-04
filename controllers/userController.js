const User = require("../models/User");

const getAllUsers = (req, res) => {
  const filter = req.body.filter || {};
  try {
    User.findUsers(filter, (err, users) => {
      if (err) return res.status(400).json({ message: err.message });

      res.status(200).json(users);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = (req, res) => {
  const criteria = req.body.criteria || {};

  try {
    User.findOneUser(criteria, (err, user) => {
      if (err) return res.status(400).json({ message: err.message });

      res.status(200).json(user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    if (!userId || !role)
      return res
        .status(400)
        .json({ message: `User Id and Role are required! ${userId} ${role}` });

    await User.addRole(userId, role);
    res.status(200).json({ message: "Role added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllUsers, getUser, addRole };
