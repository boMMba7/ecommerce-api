const sqlite3 = require("sqlite3");
const { dumpDataToDb } = require("./dumpData");

const dbTablesCreator = () => {
    // create SQLLite database connection
    const db = new sqlite3.Database("./DB/ecommerce.db");

    // creating table if dont exist
    db.serialize(() => {
        // -- Table structure for table `categories`
        db.run(`
          CREATE TABLE IF NOT EXISTS Categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_name TEXT DEFAULT NULL,
            description TEXT DEFAULT NULL,
            image_url TEXT DEFAULT NULL
          )
        `);

        // Create the products table
        db.run(` 
          CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT DEFAULT NULL,
            description TEXT DEFAULT NULL,
            imageurl TEXT DEFAULT NULL,
            price REAL NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (category_id) REFERENCES Categories (id)
          )
        `);

        // Create the tokens table
        db.run(`
          CREATE TABLE IF NOT EXISTS Tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT DEFAULT NULL,
            created_date DATETIME DEFAULT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users (id)
          )
        `);

        // Create the users table
        db.run(`
          CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email VARCHAR(255) UNIQUE NOT NULL,
            first_name VARCHAR(50) DEFAULT NULL,
            last_name VARCHAR(50) DEFAULT NULL,
            password VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL
          )
        `);

        // Create the wishlist table
        db.run(`
          CREATE TABLE IF NOT EXISTS Wishlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            product_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users (id),
            FOREIGN KEY (product_id) REFERENCES Products (id)
          )
        `);

        // Creating Roles Table
        db.run(`
          CREATE TABLE IF NOT EXISTS Roles (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            role TEXT,
            FOREIGN KEY (user_id) REFERENCES Users(id)
          )
        `);

        // Creating Orders Table
        db.run(`
          CREATE TABLE IF NOT EXISTS Orders (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            order_date TEXT,
            status TEXT,
            FOREIGN KEY (user_id) REFERENCES Users(id)
          )
        `);

        // Crate Orders Items table
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

        dumpDataToDb(db);
    });
};

module.exports = { dbTablesCreator };
