import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "28032005",
    database: "bookmon"
});

export default db;
