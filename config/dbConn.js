const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "../DB/ecommerce.db");

/**
 *
 * @returns Return a instance of SQLite that can be use to connect to SQLite database
 */
const connectDB = () =>
  new sqlite3.Database(dbPath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to SQLite database");
  });

module.exports = connectDB;
