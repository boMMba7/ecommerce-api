const connectDB = require("../config/dbConn");

const db = connectDB();

class User {
    constructor(username, email, password, address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
    }

    /**
     * Creates a new user in the database.
     * @param {Object} user - An object containing user information.
     * @param {string} user. - The username of the new user.
     * @param {string} user.email - The email of the new user.
     * @param {string} user.password - The password of the new user.
     * @param {string} user.address - The address of the new user.
     * @param {function} callback - A callback function to handle the result or errors.
     */
    static createUser(user, callback) {
        // Extract properties from the user object
        const { email, firstName, lastName, password, address } = user;

        // SQL query for inserting a new user into the 'Users' table
        const sql =
            "INSERT INTO Users ( email, first_name, last_name, password, address ) VALUES (?, ?, ?, ?, ?)";

        // Execute the SQL query with user data and callback
        db.run(sql, [email, firstName, lastName, password, address], callback);
    }

    /**
     * Finds users in the database based on specified criteria.
     * @param {Object} criteria - An object containing search criteria.
     * @param {number} criteria.id - Optional user ID to filter by.
     * @param {string} criteria.firstName - Optional first name to filter by using regex.
     * @param {string} criteria.lastName - Optional last name to filter by using regex.
     * @param {string} criteria.email - Optional email to filter by using regex.
     * @param {function} callback - A callback function to handle the results or errors.
     */
    static findUsers(criteria, callback) {
        // Initialize the base SQL query
        let sql = "SELECT * FROM Users WHERE 1=1";
        // Initialize an array to store parameter values for the query
        const params = [];

        // Add conditions to the SQL query based on the provided criteria
        if (criteria.id) {
            sql += " AND id = ?";
            params.push(criteria.id);
        }

        if (criteria.firstName) {
            sql += " AND first_name LIKE ?";
            params.push(`%${criteria.firstName}%`);
        }

        if (criteria.lastName) {
            sql += " AND last_name LIKE ?";
            params.push(`%${criteria.lastName}%`);
        }

        if (criteria.email) {
            sql += " AND email LIKE ?";
            params.push(`%${criteria.email}%`);
        }

        // Execute the SQL query with parameters and callback
        db.all(sql, params, callback);
    }

    /**
     * Finds a single user in the database based on specified criteria.
     * @param {Object} criteria - An object containing search criteria.
     * @param {number} criteria.id - Optional user ID to filter by.
     * @param {string} criteria.username - Optional username to filter by.
     * @param {string} criteria.email - Optional email to filter by.
     * @param {function} callback - A callback function to handle the result or errors.
     * @returns {Promise} A promise that resolves with the user and his roles or rejects with an error.
     */
    static findOneUser(criteria, callback) {
        return new Promise((resolve, reject) => {
            const showPassword = criteria.showPassword
                ? "Users.password, "
                : "";

            // Initialize the base SQL query
            let sql = `SELECT Users.first_name, Users.last_name, ${showPassword} Users.email, Users.address, 
                      GROUP_CONCAT(Roles.role) AS roles
                      FROM Users  
                      LEFT JOIN Roles ON Users.id = Roles.user_id 
                      WHERE 1=1
                      `;
            // Initialize an array to store parameter values for the query
            const params = [];

            // Add conditions to the SQL query based on the provided criteria
            if (criteria.id) {
                sql += " AND id = ?";
                params.push(criteria.id);
            }

            if (criteria.firstName) {
                sql += " AND first_name = ?";
                params.push(criteria.firstName);
            }

            if (criteria.lastName) {
                sql += " AND last_name = ?";
                params.push(criteria.lastName);
            }

            if (criteria.email) {
                sql += " AND email = ?";
                params.push(criteria.email);
            }

            sql += " GROUP BY Users.first_name";
            // Execute the SQL query with parameters
            db.get(sql, params, (err, user) => {
                if (err) {
                    if (callback) callback(err);
                    reject(err);
                } else {
                    if (callback) callback(undefined, user);
                    resolve(user);
                }
            });
        });
    }

    /**
     * Adds a role to a user in the Roles table.
     * @param {number} userId - The ID of the user to whom the role should be added.
     * @param {string} role - The role to be added to the user.
     * @returns {Promise<string>} A promise that resolves with a success message ("Role added")
     * if the role is successfully added to the user, or rejects with an error if the insertion fails.
     */
    static addRole(userId, role) {
        return new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO Roles 
          (user_id, role) VALUES (?, ?)
      `;

            db.run(sql, [userId, role], (err) => {
                if (err) return reject(err);
                resolve("Role added");
            });
        });
    }
}

module.exports = User;
