import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "dylan_dom_api",
    password: "1100954165",
    database: "eventos_dom_api"
});

export default connection;