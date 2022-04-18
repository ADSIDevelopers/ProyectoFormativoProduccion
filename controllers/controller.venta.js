let controladorVenta = {}
let conexion = require('../database/conexion');

controladorVenta.renderVenta = (req, resp) => {
    resp.render('admin/ventas');
}


controladorVenta.listarVentas = (req, resp) => {

    let sql = 'select Id_compra, Nombres, Fecha, Estado, tipo valor from compra join personas on fk_persona=identificacion join detalle on fk_Id_compra=Id_compra';
    conexion.query(sql, (err, rows) => {
        if (!err) {
            resp.json(rows);
        } else {
            console.log('Error al Listar las Ventas: ' + err);
        }
    });

}
controladorVenta.listarDetalle = (req, resp) => {

    let sql = `select * from detalle`
    conexion.query(sql, (err, rows) => {
        if (!err) {
            resp.json(rows);
        } else {
            console.log('Error al Listar  el Detalle: ' + err);
        }
    });

}



controladorVenta.listarProductos = (req, resp) => {





}

module.exports = controladorVenta;