import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gold162501!", // insira sua senha
    database: "bookmon"
});
