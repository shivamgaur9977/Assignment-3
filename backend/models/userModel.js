import db from "../config/database.js";

export const getAllUsers = (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
};

export const getUserById = (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], callback);
};

export const searchUsers = (filters, callback) => {
    let sql = "SELECT * FROM users WHERE 1=1"; // 1=1 for easy AND chaining
    const params = [];

    // Country / State / City filters
    if (filters.country) {
        sql += " AND country = ?";
        params.push(filters.country);
    }
    if (filters.state) {
        sql += " AND state = ?";
        params.push(filters.state);
    }
    if (filters.city) {
        sql += " AND city = ?";
        params.push(filters.city);
    }

    // Field + query
    const allowedFields = ["name", "email", "age", "contactNo", "gender", "occupation", "status"];

    if (filters.query) {
        if (filters.field && allowedFields.includes(filters.field)) {
            // Search in selected field only
            sql += ` AND ${filters.field} LIKE ?`;
            params.push(`%${filters.query}%`);
        } else {
            // Field not selected → search in all fields
            sql += " AND (" + allowedFields.map(f => `${f} LIKE ?`).join(" OR ") + ")";
            allowedFields.forEach(() => params.push(`%${filters.query}%`));
        }
    }

    db.query(sql, params, callback);
};
