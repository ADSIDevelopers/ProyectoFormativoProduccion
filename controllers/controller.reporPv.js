const conexion = require('../database/conexion');
let controllerRepoP_Vent = {};

controllerRepoP_Vent.reportepuntoventa = (req, res) => {
    try{   
        var sql_reporte_venta_punto =  `select inventario.stock as stockInv, produccion.Cantidad as stock, punto_venta.Nombre as NombrePvent, productos.Nombre as pdto_nombre, detalle.cantidad, detalle.valor, movimientos.Fecha, unidades_productivas.Nombre from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona
        join productos on Codigo_up = fk_codigo_up
        join produccion on Codigo_pdto = produccion.fk_codigo_pdto group by ;`;   
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);     
            res.render('admin/reportpuntv', { rep_venta_punto:rows});
        });     
    }
    catch(e){
        console.log(e);
    } 
}
controllerRepoP_Vent.reporteCantidad = (req, res) => {
    try{   
        var sql_reporte_venta_punto =  `select inventario.stock as stockInv, produccion.Cantidad as stock, punto_venta.Nombre as NombrePvent, productos.Nombre as pdto_nombre, detalle.cantidad, detalle.valor, movimientos.Fecha, unidades_productivas.Nombre from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona
        join productos on Codigo_up = fk_codigo_up
        join produccion on Codigo_pdto = produccion.fk_codigo_pdto group by ;`;   
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);     
            res.render('admin/reportpuntv', { rep_venta_punto:rows});
        });     
    }
    catch(e){
        console.log(e);
    } 
}

module.exports = controllerRepoP_Vent;