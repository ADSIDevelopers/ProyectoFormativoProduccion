let mysql = require('mysql');
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'produccion'
});
/* let conexion = mysql.createConnection({
    host: 'bsmwpxrcyzptfha22nhe-mysql.services.clever-cloud.com',
    user: 'uxbb2m9uqgkcgbys',
    password: 'rygMdhJgbwHBhjcDDotQ',
    database: 'bsmwpxrcyzptfha22nhe'
}); */
conexion.connect((err) => {
    if (!err) {
        console.log('Conectado a MySQL.');
    } else {
        console.log('Error al conectar a MySQL: ' + err);
    }
});
module.exports = conexion;