const express = require("express");

const userController = require("../../controllers/userController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/one").get(userController.getUser);

router.route("/roles").post(userController.addRole);

module.exports = router;
