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

    /**
     * Get products based on provided product IDs.
     * If no product IDs are provided, retrieves all products.
     *
     * @param {number[]} [productIds] - An array of product IDs.
     * @returns {Promise<Object[]>} A promise that resolves to an array of products.
     * @throws {Error} If an error occurs during the database query.
     */
    static getProducts(productIds) {
        return new Promise((resolve, reject) => {
            let query = `
              SELECT 
                  Products.id, Products.description, Products.imageurl, Products.name, Products.price,
                  Categories.id AS category_id, Categories.category_name
              FROM Products
              JOIN Categories ON Categories.id = Products.category_id`;

            if (productIds && productIds.length > 0) {
                const placeholders = productIds.map(() => "?").join(",");
                query += ` WHERE Products.id IN (${placeholders})`;
            }

            db.all(query, productIds, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        });
    }

    static findProducts(filter) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM Products WHERE 1=1";

            const params = [];

            if (filter.id) {
                sql += " AND id = ?";
                params.push(filter.id);
            }

            if (filter.description) {
                sql += " AND description LIKE ?";
                params.push(`%${filter.description}%`);
            }

            if (filter.imageUrl) {
                sql += " AND imageurl = ?";
                params.push(filter.imageUrl);
            }

            if (filter.name) {
                sql += " AND name = ?";
                params.push(filter.name);
            }

            if (filter.price) {
                sql += " AND price = ?";
                params.push(filter.price);
            }

            if (filter.categoryId) {
                sql += " AND category_id = ?";
                params.push(filter.categoryId);
            }

            db.all(sql, params, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        });
    }
}

module.exports = Product;
