import express from 'express';
import mysql2 from 'mysql2';
const app = express();
import cors from 'cors';

app.use(cors());

//Connection To database:-
const db = mysql2.createConnection({
    host: "localhost",
    user: 'root',
    database: 'members',
});

// Connect to DB
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL database.');
});

//Get All Users Route:-
app.get("/users", async (req, res) => {
    let getCommand = `SELECT * FROM users`
    db.query(getCommand, (err, results) => {
        if (err) {
            console.log("error retrieving data: ", err);
            res.status(500).json({ message: "Database Error" });
            return;
        }
        res.json(results);
    })
});

//show Route:-
app.get("/users/:id", async (req, res) => {
    let userId = req.params.id;
    let query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.log("Error Retieving the data", err);
            return res.status(500).json({ message: "Database Error" });
        }
        if (results.length == 0) {
            return res.status(404).json({ message: "User is not exists" });
        }
        res.json(results[0]);
    });
});

//Search User By the existing fields:-
app.get("/search", async (req, res) => {
    let { filter, query } = req.query;
    query = `%${query}%`;
    let dbQuery = `SELECT * FROM users WHERE ${filter} LIKE ?`;
    db.query(dbQuery, [query], (err, results) => {
        if(err) {
            console.log(err, "Error in DB");
            return ;
        };
        return res.json(results);
    });
});

app.listen(8080, () => {
    console.log("App is listening on port 8080");
});