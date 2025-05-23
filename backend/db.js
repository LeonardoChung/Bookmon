import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // insira sua senha
    database: "bookmon"
});
