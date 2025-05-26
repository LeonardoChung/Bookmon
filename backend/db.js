import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pucpr", // insira sua senha
    database: "bookmon"
});

export default db;
