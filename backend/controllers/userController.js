import { getAllUsers, getUserById, searchUsers } from "../models/userModel.js";

export const getUsers = (req, res) => {
    getAllUsers((err, results) => {
        if (err) {
            console.error("❌ Error retrieving data:", err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json(results);
    });
};

export const getUser = (req, res) => {
    const userId = req.params.id;
    getUserById(userId, (err, results) => {
        if (err) {
            console.error("❌ Error retrieving data:", err);
            return res.status(500).json({ message: "Database Error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(results[0]);
    });
};

export const searchUser = (req, res) => {
    const { country, state, city, field, query, age, distanceRange } = req.query;

    searchUsers({ country, state, city, field, query, age, distanceRange }, (err, results) => {
        if (err) {
            console.error("❌ Error retrieving search results:", err);
            return res.status(500).json({ message: "Database Error" });
        }
        res.json(results);
    });
};
