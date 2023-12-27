const OrderItems = require("../models/OrderItems");

const getTopSoldProducts = async (req, res) => {
    try {
        const { limit, categoryId } = req.query;

        const topSoldProducts = await OrderItems.getTopSoldProducts(
            limit,
            categoryId
        );

        res.status(200).json(topSoldProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getTopSoldProducts };
