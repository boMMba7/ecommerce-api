const connectDB = require("../config/dbConn");

const db = connectDB();

class Orders {
  constructor(userId, orderDate, status) {
    this.userId = userId;
    this.orderDate = orderDate;
    this.status = status;
  }

  /**
   * Registers a new order in the Orders table.
   * @param {Object} order - The order object to be registered.
   * @param {number} order.userId - The ID of the user placing the order.
   * @param {string} order.orderDate - The date of the order.
   * @param {string} order.status - The status of the order.
   * @returns {Promise<Object>} A promise that resolves with the details of the registered order
   * or rejects with an error if the registration fails.
   */
  static registerOrder(order) {
    return new Promise((resolve, reject) => {
      const { userId, orderDate, status } = order;

      const sql =
        "INSERT INTO Orders (user_id, order_date, status) VALUES (?, ?, ?)";

      db.run(sql, [userId, orderDate, status], (err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      });
    });
  }

  /**
   * Retrieves a list of orders based on the provided filter criteria.
   * @param {Object} filter - The filter criteria to apply when querying orders.
   * @param {number} [filter.id] - Optional order ID to filter by.
   * @param {number} [filter.userId] - Optional user ID to filter orders by user.
   * @param {string} [filter.orderDate] - Optional order date to filter by (in the format 'YYYY-MM-DD').
   * @param {string} [filter.status] - Optional order status to filter by.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array of orders matching the filter criteria
   * or rejects with an error if the query fails.
   */
  static findOrders(filter) {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM Orders WHERE 1=1";

      const params = [];

      if (filter.id) {
        sql += " AND id = ?";
        params.push(filter.id);
      }

      if (filter.userId) {
        sql += " AND user_id = ?";
        params.push(filter.userId);
      }

      if (filter.orderDate) {
        sql += " AND order_date = ?";
        params.push(filter.orderDate);
      }

      if (filter.status) {
        sql += " AND status = ?";
        params.push(filter.status);
      }

      db.all(sql, params, (err, orders) => {
        if (err) {
          reject(err);
        } else {
          resolve(orders);
        }
      });
    });
  }

  /**
   * Retrieves detailed information about a specific order, including user and product details.
   * @param {number} orderId - The ID of the order to retrieve details for.
   * @returns {Promise<Array<Object>>} A promise that resolves with an array containing detailed information about the order,
   * including order ID, order date, order status, user username, product name, product description, quantity, and subtotal.
   * Rejects with an error if the query fails.
   */
  static orderDetails(orderId) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT Orders.id AS order_id, Orders.order_date, Orders.status,
      OrderItems.quantity, OrderItems.subtotal,
      Users.username,
      Products.name AS product_name, Products.description AS product_description
      FROM Orders
      JOIN OrderItems ON Orders.id = OrderItems.order_id
      JOIN Users ON Orders.user_id = Users.id
      JOIN Products ON OrderItems.id = Products.id
      WHERE order_id = ?
      `;

      db.all(sql, [orderId], (err, table) => {
        if (err) {
          reject(err);
        } else {
          resolve(table);
        }
      });
    });
  }
}

module.exports = Orders;
