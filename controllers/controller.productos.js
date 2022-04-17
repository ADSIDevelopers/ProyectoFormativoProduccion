const conexion = require('../database/conexion');
const controlador = {};

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, img, cb) {
        cb(null, "public/img/products");
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

controlador.RegistrarProductos = (req, res) => {
    let codigo = req.body.codigopdto;
    let nombre = req.body.nombrepdto;
    let Descripcion = req.body.descripcionpdto;
    let Imagen = req.file.originalname;
    let Estado = req.body.estadopdto;
    let Reserva = req.body.reservapdto;
    let Valor = req.body.valorpdto;
    let Codigoup = req.body.up;
        let sql = `insert into productos(Codigo_pdto,Nombre,Descripcion,imagen,Estado,Reserva,Valor_pdto,fk_codigo_up) 
                   values('${codigo}','${nombre}','${Descripcion}','${Imagen}','${Estado}','${Reserva}','${Valor}','${Codigoup}')`;
    conexion.query(sql,(err, rows)=>{
        if(!err){
            res.send("Se registro con exito");
        }
        else{
            res.send("No se logro registrar" + error);
        }
    });
};

controlador.ListaProductos = (req, res) => {
    var sql = "select * from productos;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log('eror al listar la tabla de productos' + err);
        }
    });
};

module.exports = controlador;