let controladorVenta = {}
let conexion = require('../database/conexion');

controladorVenta.renderVenta = (req, resp) => {
    resp.render('admin/ventas');
}





controladorVenta.listarVentas = (req, resp) => {

    try {
        let idcompra = req.body.IdCompra;
        let sql = 'select Id_compra, Nombres, Fecha, valor from compra join personas on fk_persona=identificacion join detalle on fk_Id_compra=Id_compra';
        conexion.query(sql, (err, rows) = {});
    } catch (error) {
        console.log('Error al Listar las ventas: ' + error);
    }

}

module.exports = controladorVenta;