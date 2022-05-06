const mysql = require("mysql");
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "4033",
    database: "produccion",
});

// var conexion = mysql.createConnection({
//     host: "bsmwpxrcyzptfha22nhe-mysql.services.clever-cloud.com",
//     user: "uxbb2m9uqgkcgbys",
//     password: "rygMdhJgbwHBhjcDDotQ",
//     database: "bsmwpxrcyzptfha22nhe",
//     port: "3306"
// });

conexion.connect((err) => {
    if (!err) {
        console.log("Conectado a MySQL");
    } else {
        console.log("Error al conectar a MySQL: " + err);
    }
});
module.exports = conexion;