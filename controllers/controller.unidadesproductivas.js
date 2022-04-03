const conexion = require('../database/conexion');
const controlador = {};
const multer = require('multer');

const storage=multer.diskStorage({
    destination:function(req,img,cb){
        cb(null,"public/img");
    },
    filename:function(req,img,cb){
        cb(null,img.originalname);
    }
});

const upload = multer({storage:storage});
controlador.CargarImagen=upload.single('img');

controlador.AbrirformularioUnidadesProductivas=(req,res)=>{
    let sql = "select * from personas;";
    conexion.query(sql,(err, rows)=>{
        if(!err){
            res.render("admin/form_unidadesproductivas.ejs",{Datos:rows});
        }
        else{
            console.log('eror al abrir el formulario de unidades productivas '+ err)
        }
    });
};

controlador.Vista=(req,res)=>{
    res.render('UnidadesProductivas.ejs')
};

controlador.RegistrarUnidadProductiva=(req,res)=>{
    try{
        let codigo = req.body.codigounidad;
        let nombre = req.body.nombreunidad;
        let logo = req.file.originalname;
        let Descripcion = req.body.descripcionunidad;
        let Sede = req.body.sedeunidad;
        let Persona = req.body.personaunidad;
        let sql = `insert into unidades_productivas(codigo_up,Nombre,Logo,Descripcion,sede,fk_persona) 
                  values('${codigo}','${nombre}','${logo}','${Descripcion}','${Sede}','${Persona}')`;
         conexion.query(sql,(err, rows)=>{
                res.send("Se registro con exito");
        });
    }
    catch(error){
        res.send("No se logro registrar"+error);
    }
};
controlador.ListaUnidadesProductivas=(req,res)=>{
    var sql = "select * from unidades_productivas;";
    conexion.query(sql,(err,rows)=>{
        if(!err){
            res.render('admin/lista_unidadesprodcutivas.ejs', {date:rows});
        }
        else{
            console.log('eror al listar la tabla Unidades Productivas '+err);
        }
    });
};
controlador.EliminarUnidadProductiva=(req,res)=>{
    try{
    let Id = req.params.id;
    let sql3 = `delete from unidades_productivas where codigo_up=${Id}`;
         conexion.query(sql3,(err, rows)=>{
                res.send("Se Elimino con exito");
        });
    }
    catch(error){
        res.send("No se logro Eliminar"+error);
    }
};

module.exports=controlador;