const { orderValidator } = require("../config/dataValidator");
const Order = require("../models/Order");

const registerOrder = async (req, res) => {
  try {
    const { order } = req.body;

    const { error } = orderValidator(order);
    if (error) return res.status(400).json({ message: error.message });

    await Order.registerOrder(order);

    res.status(200).json({ message: "Order registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" + error });
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

module.exports = { registerOrder, findOrders };
