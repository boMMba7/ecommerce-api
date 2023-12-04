const express = require("express");
const orderController = require("../../controllers/orderController");
const router = express.Router();

router
  .route("/")
  .get(orderController.findOrders)
  .post(orderController.registerOrder)
  .put(orderController.addItemsToOrder);

router.route("/order-items").post(orderController.addItemsToOrder);

router.route("/details").get(orderController.getOrderDetails);

module.exports = router;
