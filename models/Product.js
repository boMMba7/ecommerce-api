const connectDB = require("../config/dbConn");

const db = connectDB();

class Product {
    constructor(description, imageUrl, name, price, categoryId) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
    }

    /**
     * Inserts a product into the database.
     * @param {Object} product - The product object to be inserted.
     * @param {string} product.name - The name of the product.
     * @param {string} product.description - The description of the product.
     * @param {number} product.price - The price of the product.
     * @param {number} product.stockQuantity - The stock quantity of the product.
     * @returns {Promise<Object>} A promise that resolves with the inserted product data
     * or rejects with an error if the insertion fails.
     */
    static insertProduct(product) {
        return new Promise((resolve, reject) => {
            const { description, imageUrl, name, price, categoryId } = product;
            const sql =
                "INSERT INTO Products (description, imageUrl, name, price, category_id) VALUES (?, ?, ?, ?, ?)";
            db.run(
                sql,
                [description, imageUrl, name, price, categoryId],
                (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ description, imageUrl, name, price, categoryId });
                }
            );
        });
    }

    static getAllProducts(callback) {
        db.all("SELECT * FROM Products", callback);
    }
}

module.exports = Product;
