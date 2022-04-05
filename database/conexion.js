let mysql = require('mysql');
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'senaempresa_proyecto'
});

conexion.connect((err) => {
    if (!err) {
        console.log('Conectado a MySQL.');
    } else {
        console.log('Error al conectar a MySQL: ' + err);
    }
});
module.exports = conexion;