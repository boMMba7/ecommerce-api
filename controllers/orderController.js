const {
  orderValidator,
  orderItemsValidator,
} = require("../config/dataValidator");
const Order = require("../models/Order");
const OrderItems = require("../models/OrderItems");

const registerOrder = async (req, res) => {
  try {
    const { order } = req.body;

    const { error } = orderValidator(order);
    if (error) return res.status(400).json({ message: error.message });

    await Order.registerOrder(order);

    res.status(200).json({ message: "Order registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findOrders = async (req, res) => {
  try {
    const filter = req.body.filter || {};

    const orders = await Order.findOrders(filter);

    if (!orders) return res.status(404).json({ message: "No ordes found" });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addItemsToOrder = async (req, res) => {
  try {
    const { collectionOrderItems } = req.body;

    const { error } = orderItemsValidator(collectionOrderItems);
    if (error) return res.status(400).json({ message: error.message });

    let inserted = 0;
    let fail = [];
    await Promise.all(
      collectionOrderItems.map(async (oI) => {
        const newOrderItems = new OrderItems(
          oI.orderId,
          oI.productId,
          oI.quantity,
          oI.subTotal
        );

        try {
          await OrderItems.addOrderItems(newOrderItems);
          inserted++;
        } catch (error) {
          fail.push(newOrderItems);
          console.log(error);
        }
      })
    );

    res.status(200).json({ inserted, fail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.query;
    if (!orderId) return res.status(400).json({ message: "Order Id required" });

    const table = await Order.orderDetails(orderId);
    res.status(200).json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerOrder,
  findOrders,
  addItemsToOrder,
  getOrderDetails,
};
