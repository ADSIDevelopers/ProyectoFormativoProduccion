const conexion = require('../database/conexion');
const controlador = {};

controlador.AbrirformularioInventario = (req, res) => {
    let sql = "select * from inventario;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.render("admin/form_inventario.ejs", { Datos: rows });
        } else {
            console.log('eror al abrir el formulario de Inventario ' + err)
        }
    });
};

controlador.Vista = (req, res) => {
    res.render('inventario.ejs')
};
controlador.ListaInventario = (req, res) => {
    var sql = "select * from inventario;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.render('admin/lista_inventario.ejs', { date: rows });
        } else {
            console.log('eror al listar la tabla de Inventario' + err);
        }
    });
};

module.exports = controlador;