const Product = require("../models/Product");
const { productsValidator } = require("../config/dataValidator");

const getProducts = async (req, res) => {
    try {
        const { productsIds } = req.query;

        const products = await Product.getProducts(productsIds);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const findProducts = async (req, res) => {
    try {
        const { filter } = req.query;
        console.log(filter);
        const products = await Product.findProducts(filter);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Controller function to insert multiple products into the database.
 * @param {Object} req - The request object containing the products to be inserted.
 * @param {Array} req.body.products - Array of products to be inserted.
 * @param {Object} product - Product Object.
 * @param {string} product.name - The name of the product.
 * @param {string} product.description - The description of the product.
 * @param {number} product.price - The price of the product.
 * @param {number} product.stockQuantity - The stock quantity of the product.
 * @param {Object} res - The response object.
 */
const insertProduct = async (req, res) => {
    try {
        const { products } = req.body;
        const { error } = productsValidator(products);
        if (error) return res.status(400).json({ message: error.message });

        let inserted = 0;
        let fail = [];

        // Use Promise.all to await all promises
        await Promise.all(
            products.map(async (p) => {
                const newProduct = new Product(
                    p.description,
                    p.imageUrl,
                    p.name,
                    p.price,
                    p.categoryId
                );

                try {
                    const insertedProduct = await Product.insertProduct(
                        newProduct
                    );
                    inserted++;
                    console.log("Inserted Product:", insertedProduct);
                } catch (error) {
                    fail.push(newProduct);
                    console.log("Error inserting: ", newProduct, error);
                }
            })
        );

        res.status(200).json({ inserted, fail });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" + error });
    }
};

module.exports = { getProducts, insertProduct, findProducts };
