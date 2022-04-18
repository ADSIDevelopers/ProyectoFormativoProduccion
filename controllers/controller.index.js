const conexion = require('../database/conexion');
let controllerIndex = {};

controllerIndex.renderIndex = (req, resp) => {
    resp.render('index');
}
controllerIndex.adminIndex = (req, resp) => {
    resp.render('admin/index', /* {profile: req.session} */);
}
controllerIndex.perfil = (req, resp) => {
    resp.render('admin/perfil');
}
controllerIndex.usuarios = (req, resp) => {
    resp.render('admin/usuarios')
}
controllerIndex.adminProduccion = (req, resp) => {
    resp.render('admin/produccion')
}
controllerIndex.productos = (req, resp) => {
    let sql = "select * from unidades_productivas;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            resp.render('admin/productos',{Unidadesproductivas:rows})
        } else {
            console.log('eror al redirigir a la vista de Productos ' + err)
        }
    });
}
controllerIndex.unidadesproductivas = (req, resp) =>{
    let sql = "select * from personas;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            resp.render('admin/unidadesproductivas',{Personas:rows})
        } else {
            console.log('eror al redirigir a la vista de unidades productivas ' + err)
        }
    });
}
controllerIndex.puntoventa = (req, resp) =>{
    let sql = "select * from personas;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            resp.render('admin/puntoventa',{Personas:rows})
        } else {
            console.log('error al redirigir a la vista de puntos de venta ' + err)
        }
    });
}
controllerIndex.inventario = (req, resp) =>{
    var Pvent;
    var pdto;
    var sql = "select * from productos";
    conexion.query(sql,(err,rows)=>{
        if (!err) {
            pdto=rows;
        } else {
            console.log('error de ejución de la consulta sql '+ err)
        }
    });
    var sql1 = "select * from punto_venta";
    conexion.query(sql1,(err,rows)=>{
        if (!err) {
            Pvent=rows;
        } else {
            console.log('error de ejución de la consulta sql '+ err)
        }
    });
    var sql2 = "select * from inventario"
    conexion.query(sql2,(err,rows)=>{
        if (!err) {
            resp.render('admin/inventario',{Datos:rows, Productos:pdto, PVenta:Pvent})
        } else {
            console.log('error al redirigir a la vista de puntos de venta ' + err)
        }
    });
}
controllerIndex.store = (req, res) => {
    res.render('store');
}
controllerIndex.buy = (req, res) => {
    res.render('buy');
}
controllerIndex.uds = (req, res) => {
    res.render('uds');
}
controllerIndex.ud = (req, res) => {
    res.render('ud');
}
module.exports = controllerIndex;