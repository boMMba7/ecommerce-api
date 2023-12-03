const connectDB = require("../config/dbConn");

const db = connectDB();

class Product {
  constructor(name, description, price, stockQuantity) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
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
      const { name, description, price, stockQuantity } = product;
      const sql =
        "INSERT INTO Products (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)";
      db.run(sql, [name, description, price, stockQuantity], (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ name, description, price, stockQuantity });
      });
    });
  }

  static getAllProducts(callback) {
    db.all("SELECT * FROM Products", callback);
  }
}

module.exports = Product;
