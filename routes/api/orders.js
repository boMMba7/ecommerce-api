const express = require("express");
const orderController = require("../../controllers/orderController");
const router = express.Router();

router
  .route("/")
  .post(orderController.registerOrder)
  .get(orderController.findOrders);

module.exports = router;
