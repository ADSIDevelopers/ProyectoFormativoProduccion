const conexion = require('../database/conexion');
let controllerReportes = {};


controllerReportes.reporteAdmin = (req, res) => {
    try{     
        var sql_reporte_venta_punto =  `select SUM(detalle.cantidad) as DetalleCan, SUM(detalle.valor) as valordetalle, movimientos.Fecha, unidades_productivas.Nombre from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona group by  unidades_productivas.Nombre;`
        ;  
       
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);
            res.render('reportes1/reportes', {rep_venta_punto:rows});
        });
    }
    catch(e){
        console.log(e);
    }
}
controllerReportes.reporteVent = (req, res) => {
    try{     
        var sql_reporte_venta_punto =  `select  punto_venta.Nombre as NombrePvent, detalle.cantidad, SUM(detalle.valor) as valordetalle, movimientos.Fecha, unidades_productivas.Nombre from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona
   
      group by NombrePvent;`
        ;  
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);
            res.render('reportes1/rep_vent_admi', {rep_venta_punto:rows});
        });
    }
    catch(e){
        console.log(e);
    }
}
controllerReportes.reporteCant = (req, res) => {
    try{     
        var sql_reporte_venta_punto =  `select inventario.stock as stockInv, SUM(detalle.cantidad) as DetalleCan, punto_venta.Nombre as NombrePvent, productos.Nombre as pdto_nombre, detalle.cantidad, SUM(detalle.valor) as valordetaller, movimientos.Fecha, unidades_productivas.Nombre from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona
        join productos on Codigo_up = fk_codigo_up group by  NombrePvent, pdto_nombre;`
        ;  
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);
            res.render('reportes1/rep_cant_admi', {rep_venta_punto:rows});
        });
    }
    catch(e){
        console.log(e);
    }
}
controllerReportes.reporteDvp = (req, res) => {
    try{     
        var sql_reporte_venta_punto =  `select  SUM(inventario.stock) as stokInv,  punto_venta.Nombre as NombrePvent, productos.Nombre as pdto_nombre, movimientos.Fecha from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona
        join productos on Codigo_up = fk_codigo_up group by  pdto_nombre, NombrePvent;`
        ;  
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);
            res.render('reportes1/rep_dpv_admi', {rep_venta_punto:rows});
        });
    }
    catch(e){
        console.log(e);
    }
}
controllerReportes.reporteProduccion = (req, res) => {
    try{     
        var sql_reporte_venta_punto =  `select inventario.stock as stockInv, produccion.Cantidad as stockcant, punto_venta.Nombre as NombrePvent, productos.Nombre as pdto_nombre, detalle.cantidad, detalle.valor, movimientos.Fecha, unidades_productivas.Nombre from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona
        join productos on Codigo_up = fk_codigo_up
        join produccion on Codigo_pdto = produccion.fk_codigo_pdto group by  unidades_productivas.Nombre, pdto_nombre, NombrePvent;`
        ;  
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);
            res.render('reportes1/rep_produccion_admi', {rep_venta_punto:rows});
        });
    }
    catch(e){
        console.log(e);
    }
}
controllerReportes.reporteval = (req, res) => {
    try{     
        var sql_reporte_venta_punto =  `select  productos.Nombre as pdto_nombre, SUM(detalle.cantidad) AS cantidadVent, SUM(detalle.valor) AS valorVent, movimientos.Fecha from punto_venta 
        join inventario on Id_punto_vent =  fk_id_punto_vent
        join detalle on id_inventario = fk_id_inventario
        join movimientos on fk_id_movimiento = Id_movimiento
        join personas on identificacion = movimientos.fk_persona
        join unidades_productivas on identificacion=unidades_productivas.fk_persona
        join productos on Codigo_up = fk_codigo_up group by  pdto_nombre;`
        ;  
        conexion.query(sql_reporte_venta_punto,(err,rows)=>{
            if(err) return console.log(err);
            res.render('reportes1/rep_val_admi', {rep_venta_punto:rows});
        });
    }
    catch(e){
        console.log(e);
    }
}
module.exports = controllerReportes;