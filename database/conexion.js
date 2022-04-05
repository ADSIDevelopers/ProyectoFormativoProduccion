let mysql = require('mysql');
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'produccion2'
});

conexion.connect((err) => {
    if (!err) {
        console.log('Conectado a MySQL.');
    } else {
        console.log('Error al conectar a MySQL: ' + err);
    }
});
module.exports = conexion;