const conexion = require('../database/conexion');
const controlador = {};

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, img, cb) {
        cb(null, "public/img");
    },
    filename: function(req, img, cb) {
        cb(null, img.originalname);
    }
});

const upload = multer({ storage: storage });
controlador.CargarImagen = upload.single('img');

controlador.Vista = (req, res) => {
    res.render('productos.ejs')
};

controlador.AbrirformularioProductos = (req, res) => {
    let sql = "select * from productos;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.render("admin/form_productos.ejs", { Datos: rows });
        } else {
            console.log('eror al abrir el formulario de productos ' + err)
        }
    });
};

controlador.ListaProductos = (req, res) => {
    var sql = "select * from productos;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.render('admin/lista_productos.ejs', { date: rows });
        } else {
            console.log('eror al listar la tabla de productos' + err);
        }
    });
};

module.exports = controlador;