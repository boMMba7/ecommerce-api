const sqlite3 = require("sqlite3");

const { dbTablesCreator } = require("./creatTables");

const dbConfig = () => {
    // create SQLLite database connection
    const db = new sqlite3.Database("./DB/ecommerce.db");

    // Check if the database has tables
    const checkTablesQuery =
        "SELECT COUNT(*) as count FROM sqlite_master WHERE type='table'";

    db.get(checkTablesQuery, (err, row) => {
        if (err) {
            console.error(
                "Error checking if there are tables in the database:",
                err.message
            );
            return;
        }

        const hasTables = row.count > 0;

        if (!hasTables) {
            dbTablesCreator();

            console.log("Tables created and data inserted.");
        } else {
            console.log(
                "Database already has tables. Skipping table creation and data insertion."
            );
        }
    });
};

module.exports = { dbConfig };
