const conexion = require('../database/conexion');
const controlador = {};

controlador.AbrirformularioPuntoventa = (req, res) => {
    let sql = "select * from punto_venta;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.render("admin/form_puntoventa.ejs", { Datos: rows });
        } else {
            console.log('eror al abrir el formulario de Punto de Venta ' + err)
        }
    });
};

controlador.Vista = (req, res) => {
    res.render('puntoventa.ejs')
};
controlador.ListaPuntoventa = (req, res) => {
    var sql = "select * from punto_venta;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.render('admin/lista_puntoventa.ejs', { date: rows });
        } else {
            console.log('eror al listar la tabla de Puntos de Venta' + err);
        }
    });
};

module.exports = controlador;