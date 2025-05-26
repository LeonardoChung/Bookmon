import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gold162501!", // insira sua senha
    database: "bookmon"
});

export default db;
