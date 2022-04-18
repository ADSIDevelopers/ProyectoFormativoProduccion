let controllerEstadisticas = {}
let conexion = require('../database/conexion');

controllerEstadisticas.reportegeneral = (req, res) => {
    try {
        var sql_up = `select * from unidades_productivas`;
        var sql_prod = `select * from productos`;
        var sql_pv = `select * from punto_venta`;
        var sql_reporte_venta_punto = `select punto_venta.nombre as pnto_nombre, productos.Nombre as pdto_nombre, detalle.cantidad, detalle.valor, compra.Fecha from detalle 
        join compra on fk_Id_compra = compra.Id_compra 
        join inventario on id_inventario = fk_id_inventario
        join productos on Codigo_pdto = fk_codigo_pdto
        join punto_venta on Id_punto_vent = fk_id_punto_vent;`;
        conexion.query(sql_up, (err, rows) => {
            if (err) return console.log(err);
            req.up = rows;
        });
        conexion.query(sql_prod, (err, rows) => {
            if (err) return console.log(err);
            req.prod = rows;
        });
        conexion.query(sql_pv, (err, rows) => {
            if (err) return console.log(err);
            req.pv = rows;
        });
        conexion.query(sql_reporte_venta_punto, (err, rows) => {
            if (err) return console.log(err);
            req.rep_venta_pnto = rows;
            res.render('admin/reportes', { up: req.up, prod: req.prod, pv: req.pv, rep_venta_punto: req.rep_venta_pnto });
        });
    } catch (e) {
        console.log(e);
    }
}
controllerEstadisticas.reporteunidades = (req, res) => {
    try {
        var sql_up = `select * from unidades_productivas`;
        var sql_reporte_venta_punto = `select punto_venta.nombre as pnto_nombre, productos.Nombre as pdto_nombre, detalle.cantidad, detalle.valor, compra.Fecha from detalle 
        join compra on fk_Id_compra = compra.Id_compra 
        join inventario on id_inventario = fk_id_inventario
        join productos on Codigo_pdto = fk_codigo_pdto
        join punto_venta on Id_punto_vent = fk_id_punto_vent;`;
        uprod = null;
        conexion.query(sql_up, (err, rows) => {
            if (err) return console.log(err);
            req.up = rows;
            res.render('admin/reportUp', { Unidadesproductivas: req.up });
        });
    } catch (e) {
        console.log(e);
    }
}
controllerEstadisticas.reportepuntoventa = (req, res) => {
    try {
        var sql_up = `select * from unidades_productivas`;
        var sql_prod = `select * from productos`;
        var sql_pv = `select * from punto_venta`;
        var sql_reporte_venta_punto = `select punto_venta.nombre as pnto_nombre, productos.Nombre as pdto_nombre, detalle.cantidad, detalle.valor, compra.Fecha from detalle 
        join compra on fk_Id_compra = compra.Id_compra 
        join inventario on id_inventario = fk_id_inventario
        join productos on Codigo_pdto = fk_codigo_pdto
        join punto_venta on Id_punto_vent = fk_id_punto_vent;`;
        conexion.query(sql_up, (err, rows) => {
            if (err) return console.log(err);
            req.up = rows;
        });
        conexion.query(sql_prod, (err, rows) => {
            if (err) return console.log(err);
            req.prod = rows;
        });
        conexion.query(sql_pv, (err, rows) => {
            if (err) return console.log(err);
            req.pv = rows;
        });
        conexion.query(sql_reporte_venta_punto, (err, rows) => {
            if (err) return console.log(err);
            req.rep_venta_pnto = rows;
        });
        conexion.query(sql_reporte_venta_punto, (err, rows) => {
            res.render('admin/reportpuntv', { up: req.up, prod: req.prod, pv: req.pv, rep_venta_punto: req.rep_venta_pnto });
        });
    } catch (e) {
        console.log(e);
    }
}



module.exports = controllerEstadisticas;