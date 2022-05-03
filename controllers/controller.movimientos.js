let controladorMovimiento = {}
let conexion = require('../database/conexion');

controladorMovimiento.renderMovimientos = (req, resp) => {
    resp.render('admin/movimientos');
}


controladorMovimiento.listarMovimientos = (req, resp) => {
    try {
        let sql = 'select Id_movimiento,date_format(Fecha, "%d-%m-%Y") as Fecha ,Estado,(select Nombres from personas where movimientos.fk_persona=personas.identificacion)as personas,(select sum(valor * cantidad) from detalle where fk_Id_movimiento=movimientos.Id_movimiento) as total from movimientos;';
        conexion.query(sql, (err, rows) => {
            resp.json(rows);
        });

    } catch (error) {
        console.log('Error al Listar los Movimientos: ' + error);
    }
}

controladorMovimiento.mostrarDetalle = (req, resp) => {
    var iden = req.body.idcodigo;
    console.log(iden);
    let sql = `select Codigo_pdto, Nombre, Cantidad, precio as VlrUnit, (Cantidad*precio) as VlrTotal, detalle.Estado as  EstadoVenta from productos join precios on Codigo_pdto=fk_producto join inventario on Codigo_pdto=fk_codigo_pdto join detalle    on id_inventario=fk_id_inventario join movimientos where Id_movimiento=fk_Id_movimiento and fk_Id_movimiento=` + iden;
    try {
        conexion.query(sql, (err, rows) => {
            resp.json(rows);
            console.log(rows);
        });
    } catch (error) {
        console.log('Error al Listar  el Detalle: ' + error);

    }
}



controladorMovimiento.listarProductos = (req, resp) => {
        let tusuario;
        try {
            let sql = `select * from Lista_Productos`;
            conexion.query(sql, (err, rows) => {
                console.log(rows);
                resp.json(rows);
            });
        } catch (error) {
            console.log('Error al Listar los Productos: ' + error);

        }
    }
    /* =================controlador agregar================ */
controladorMovimiento.consAggProd = (req, resp) => {
    var id = req.body.codigop;
    let cargoSesion = "Instructor";
    try {
        let sql = `select * from Lista_Productos where cod_producto=` + id;

        conexion.query(sql, (err, rows) => {
            resp.json(rows);
        });
    } catch (error) {
        console.log('Error al Listar los Productos: ' + error);
    }
}

module.exports = controladorMovimiento;


/* ==================filtro busqueda clientes=============== */
controladorMovimiento.filtro = (req, resp) => {
    var iden = req.body.iden;
    let cargoSesion = "Instructor";
    try {
        let sql = "SELECT identificacion, Cargo,Nombres FROM `personas` WHERE identificacion=" + iden;
        conexion.query(sql, (err, rows) => {
            resp.json(rows);
            console.log(rows)
        });
    } catch (error) {
        console.log('Error al Listar los Productos: ' + error);
    }
}


controladorMovimiento.facturarNuevaVenta = (req, resp) => {
    let op1 = 'NuevaVenta';
    let Idmovimiento = req.body.idmov;
    let pEstado = req.body.estado;
    let pPersona = req.body.idcodigo;
    let pTipo = 'Individual';
    let pEntregado = 'Facturado';
    try {
        let sql = `CALL Administrar_Ventas(${op1}, P_estado=${pEstado},P_persona=${pPersona},P_tipo=${pTipo}, P_entregado=${pEntregado}`;
        console.log(sql);
        conexion.query(sql, (err, rows) => {
            resp.json({
                titulo: "Mensaje",
                icon: "success",
                message: "Se registro con exito!"
            });

        });
    } catch (error) {}
}
module.exports = controladorMovimiento;