const OrderItems = require("../models/OrderItems");

const getTopSoldProducts = async (req, res) => {
    try {
        const { limit } = req.query;

        const topSoldProducts = await OrderItems.getTopSoldProducts(limit);

        res.status(200).json(topSoldProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getTopSoldProducts };
