const connectDB = require("../config/dbConn");
const { getRandomElementsFromArray } = require("../utility/functions");
const Product = require("./Product");

const db = connectDB();

class OrderItems {
    constructor(orderId, productId, quantity, subTotal) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.subTotal = subTotal;
    }

    /**
     * Adds items to an existing order in the OrderItems table.
     * @param {Object} items - The details of the items to be added to the order.
     * @param {number} items.orderId - The ID of the order to which the items should be added.
     * @param {number} items.productId - The ID of the product to be added to the order.
     * @param {number} items.quantity - The quantity of the product to be added to the order.
     * @param {number} items.subTotal - The subtotal for the items being added.
     * @returns {Promise<void>} A promise that resolves if the items are successfully added to the order,
     * or rejects with an error if the insertion fails.
     */
    static addOrderItems(items) {
        return new Promise((resolve, rejecte) => {
            const { orderId, productId, quantity, subTotal } = items;

            const sql =
                "INSERT INTO OrderItems (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)";

            db.run(sql, [orderId, productId, quantity, subTotal], (err) => {
                if (err) return rejecte(err);
                resolve();
            });
        });
    }

    /**
     * Retrieves a list of order items based on the provided filter criteria.
     * @param {Object} filter - The filter criteria to apply when querying order items.
     * @param {number} [filter.id] - Optional order item ID to filter by.
     * @param {number} [filter.orderId] - Optional order ID to filter order items by order.
     * @param {number} [filter.productId] - Optional product ID to filter order items by product.
     * @param {number} [filter.quantity] - Optional quantity to filter order items by.
     * @returns {Promise<Array<Object>>} A promise that resolves with an array of order items matching the filter criteria
     * or rejects with an error if the query fails.
     */
    static findOrderItems(filter) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM OrderItems WHERE 1=1";

            const params = [];

            if (filter.id) {
                sql += " AND id = ?";
                params.push(filter.id);
            }

            if (filter.orderId) {
                sql += " AND order_id = ?";
                params.push(filter.orderId);
            }

            if (filter.productId) {
                sql += " AND product_id = ?";
                params.push(filter.productId);
            }

            if (filter.quantity) {
                sql += " AND quantity = ?";
                params.push(filter.quantity);
            }

            db.all(sql, params, (err, orderItems) => {
                if (err) return reject(err);
                resolve(orderItems);
            });
        });
    }

    /**
     * Fetches the top 5 sold products from the database.
     * If less than 5 products are sold, fills the result array with random products.
     *
     * @returns {Promise<Array>} A promise that resolves with an array of the top 5 sold products
     *                           or random products if less than 5 products are sold.
     * @throws {Error} If there is an issue with the database query.
     */
    static getTopSoldProducts = (limit = 5, categoryId) => {
        return new Promise((resolve, reject) => {
            let query = `
            SELECT 
                Products.id, Products.name, Products.description, Products.price, Products.imageurl,
                Categories.category_name,
                SUM(OrderItems.quantity) AS total_sold
            FROM OrderItems
            JOIN Products ON OrderItems.product_id = Products.id
            JOIN Categories ON Products.category_id = Categories.id
            WHERE 1=1 
            
        `;

            const params = [];

            if (categoryId) {
                params.push(categoryId);
                query += " AND Products.category_id = ?";
            }

            query += `
                GROUP BY Products.id
                ORDER BY total_sold DESC`;

            params.push(limit);
            query += " LIMIT ?";

            db.all(query, params, async (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // Check if the result array has less than limit products
                    if (!categoryId && rows.length < limit) {
                        //  fetch additional random products to fill the array
                        const xtraProducts = await Product.getProducts();

                        const missingProducs = limit - rows.length;
                        const randomProducts = getRandomElementsFromArray(
                            xtraProducts,
                            missingProducs
                        );

                        rows = [...rows, ...randomProducts];
                    }

                    resolve(rows);
                }
            });
        });
    };
}

module.exports = OrderItems;
