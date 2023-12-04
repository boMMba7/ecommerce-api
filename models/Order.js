const connectDB = require("../config/dbConn");

const db = connectDB();

class Orders {
  constructor(userId, orderDate, status) {
    this.userId = userId;
    this.orderDate = orderDate;
    this.status = status;
  }

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
}

module.exports = Orders;
