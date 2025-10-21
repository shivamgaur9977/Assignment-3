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
    let sql = "SELECT * FROM users WHERE 1=1";
    const params = [];

    // 🌍 Country / State / City filters
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

    // 👶 Age range filter
    if (filters.age && !isNaN(filters.age)) {
        sql += " AND age = ?";
        params.push(Number(filters.age));
    }

    // 📏 Distance range filter
    if (filters.distanceRange) {
        const [minDist, maxDist] = filters.distanceRange.split('-').map(Number);
        if (!isNaN(minDist) && !isNaN(maxDist)) {
            sql += " AND CAST(distance AS UNSIGNED) BETWEEN ? AND ?";
            params.push(minDist, maxDist);
        }
    }

    // 🔍 Search by field or all fields
    const allowedFields = ["name", "email", "age", "contactNo", "gender", "occupation", "status"];
    if (filters.query) {
        if (filters.field && allowedFields.includes(filters.field)) {
            // special handling for age (numeric field)
            if (filters.field === "age" && !isNaN(filters.query)) {
                sql += " AND age = ?";
                params.push(Number(filters.query));
            } else {
                sql += ` AND ${filters.field} LIKE ?`;
                params.push(`%${filters.query}%`);
            }
        } else {
            // search in all allowed fields
            sql += " AND (" + allowedFields.map(f => `${f} LIKE ?`).join(" OR ") + ")";
            allowedFields.forEach(() => params.push(`%${filters.query}%`));
        }
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return callback({ message: "Database Error" });
        }
        callback(null, results);
    });
};
