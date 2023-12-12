const express = require("express");
const orderItemsController = require("../../controllers/orderItemsController");
const router = express.Router();

router.route("/top-sold").get(orderItemsController.getTopSoldProducts);

module.exports = router;
