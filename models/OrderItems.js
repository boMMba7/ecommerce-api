const connectDB = require("../config/dbConn");

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
}

module.exports = OrderItems;
