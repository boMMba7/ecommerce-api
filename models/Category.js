const connectDB = require("../config/dbConn");

const db = connectDB();

class Category {
    constructor(name, description, imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    static getCategories() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM Categories
            `;

            db.all(query, (err, categories) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(categories);
                }
            });
        });
    }
}

module.exports = Category;
