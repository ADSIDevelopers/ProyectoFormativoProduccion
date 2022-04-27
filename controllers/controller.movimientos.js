let controladorMovimiento = {}
let conexion = require('../database/conexion');

controladorMovimiento.renderMovimientos = (req, resp) => {
    resp.render('admin/movimientos');
}


controladorMovimiento.listarMovimientos = (req, resp) => {
    try {
        let sql = 'select Id_movimiento,date_format(Fecha, "%d-%m-%Y") as Fecha ,Estado,(select Nombres from personas where movimientos.fk_persona=personas.identificacion)as personas,(select sum(valor * cantidad) from detalle where fk_Id_movimiento=movimientos.Id_movimiento) as total from movimientos;';
        conexion.query(sql, (err, rows) => {
            console.log(rows);
            resp.json(rows);
        });

    } catch (error) {
        console.log('Error al Listar los Movimientos: ' + error);
    }
}


controladorMovimiento.mostrarDetalle = (req, resp) => {

    try {
        let sql = `select Codigo_pdto,Id_movimiento, Nombre, Cantidad, precio as VlrUnit, (Cantidad*precio) as VlrTotal, detalle.Estado as  EstadoVenta from productos join precios on Codigo_pdto=fk_producto join inventario on Codigo_pdto=fk_codigo_pdto join detalle on id_inventario=fk_id_inventario join movimientos where Id_movimiento=fk_Id_movimiento;`;
        conexion.query(sql, (err, rows) => {
            console.log(rows);

            resp.json(rows);

        });
    } catch (error) {
        console.log('Error al Listar  el Detalle: ' + error);

    }
}


controladorMovimiento.listarProductos = (req, resp) => {
    try {
        let sql = `select Codigo_pdto, productos.Nombre as NombreProd,Precio , unidades_productivas.Nombre as UProd from productos join unidades_productivas on codigo_up=fk_codigo_up join precios on Codigo_pdto=fk_producto;`;
        conexion.query(sql, (err, rows) => {
            console.log(rows);
            resp.json(rows);
        });
    } catch (error) {
        console.log('Error al Listar los Productos: ' + error);

    }
}

controladorMovimiento.acumProd = (req, resp) => {

}

module.exports = controladorMovimiento;