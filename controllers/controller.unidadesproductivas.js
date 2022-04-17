const conexion = require('../database/conexion');
const controlador = {};
const multer = require('multer');
const { request } = require('express');
const { json } = require('express/lib/response');

const storage = multer.diskStorage({
    destination: function(req, img, cb) {
        cb(null, "public/img/logos");
    },
    filename: function(req, img, cb) {
        cb(null, img.originalname);
    }
});

const upload = multer({ storage: storage });
controlador.CargarImagen = upload.single('img');

controlador.Vista = (req, res) => {
    res.render('UnidadesProductivas.ejs')
};


controlador.RegistrarUnidadProductiva = (req, res) => {
        let codigo = req.body.codigo;
        let nombre = req.body.nombre;
        let logo = req.file.originalname;
        let Descripcion = req.body.descripcion;
        let Sede = req.body.sede;
        let Persona = req.body.encargado;
        let sql = `insert into unidades_productivas(codigo_up,Nombre,Logo,Descripcion,sede,fk_persona) 
                  values('${codigo}','${nombre}','${logo}','${Descripcion}','${Sede}','${Persona}')`;
    conexion.query(sql,(err, rows)=>{
        if(!err){
            res.send("Se registro con exito");
        }
        else{
            res.send("No se logro registrar" + error);
        }
    });
};


controlador.ListaUnidadesProductivas = (req, res) => {
    var sql = "select * from unidades_productivas;";
    conexion.query(sql, (err, rows) => {
        if(!err){
            res.json(rows);
        }
        else{
            console.log("No see Pudo listar"+error);
        }
    });
};

controlador.EliminarUnidadProductiva = (req, res) => {
    try {
        let Id = req.params.id;
        let sql3 = `delete from unidades_productivas where codigo_up=${Id}`;
        conexion.query(sql3, (err, rows) => {
            res.send("Se Elimino con exito");
        });
    } catch (error) {
        res.send("No se logro Eliminar" + error);
    }
};

module.exports = controlador;