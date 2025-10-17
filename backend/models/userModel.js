import db from "../config/database.js";

export const getAllUsers = (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
};

export const getUserById = (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], callback);
};

export const searchUsers = (filter, queryText, callback) => {
    const query = `SELECT * FROM users WHERE ${filter} LIKE ?`;
    db.query(query, [`%${queryText}%`], callback);
};
