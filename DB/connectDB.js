const sqlite3 = require("sqlite3");

const dbCreator = () => {
  // create SQLLite database connection
  const db = new sqlite3.Database("./DB/ecommerce.db");

  // creating table if dont exist
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        description TEXT,
        price REAL,
        stock_quantity INTEGER
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        email TEXT,
        password TEXT,
        address TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS Orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        order_date TEXT,
        status TEXT,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS OrderItems (
        id INTEGER PRIMARY KEY,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        subtotal REAL,
        FOREIGN KEY (order_id) REFERENCES Orders(id),
        FOREIGN KEY (product_id) REFERENCES Products(id)
      )
    `);
  });
};

module.exports = { dbCreator };
