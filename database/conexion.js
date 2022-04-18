const mysql = require("mysql");
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "produccion",
});

conexion.connect((err) => {
    if (!err) {
        console.log("Conectado a MySQL");
    } else {
        console.log("Error al conectar a MySQL: " + err);
    }
});
module.exports = conexion;