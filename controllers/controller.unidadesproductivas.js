const conexion = require('../database/conexion');
const controlador = {};
const multer = require('multer');
const { json } = require('express/lib/response');

const storage = multer.diskStorage({
    destination: function(req, img, cb) {
        cb(null, "public/img/logos");
        
    },
    filename: function(req, img, cb) {
        const datoahora = Date.now();
        req.fileNewName = datoahora + img.originalname;
        cb(null,req.fileNewName );
    }
});

const upload = multer({ storage: storage });
controlador.CargarImagen = upload.single('img');

controlador.Vista = (req, res) => {
    try{
        let sql = "select * from personas;";
        conexion.query(sql, (err, rows) => {
            if (!err) {
                res.render('admin/unidadesproductivas',{Personas:rows})
            } else {
                console.log('eror al redirigir a la vista de unidades productivas ' + err)
            }
        });
    }
    catch(e){
        console.log(e);
    }
};


controlador.RegistrarUnidadProductiva = (req, res) => {
    try{
        let nombre = req.body.Nombre;
        let logo = req.fileNewName;
        let Descripcion = req.body.Descripcion;
        let Sede = req.body.Sede;
        let Estado = req.body.Estado;
        let Entrega = req.body.Entrega;
        let Persona = req.body.PersonaEncargada;
        let sql = `insert into unidades_productivas(Nombre,Logo,Descripcion,sede,estado,entrega_producto,fk_persona) 
                  values('${nombre}','${logo}','${Descripcion}','${Sede}','${Estado}','${Entrega}','${Persona}')`;
                  /* console.log(sql) */
            conexion.query(sql,(err, rows)=>{
                if (err) return res.json({ 
                    titulo : "error",
                    icono: "error",
                    mensaje : "La Unidad Productiva no se Logro Registrar "+ err,
                    timer : 2000
                }); 
                return res.json({  
                    titulo : "Registro Exitoso",
                    icono: "success",
                    mensaje : "La Unidad Productiva ha sido Registrada con éxito",
                    timer : 2000
                });
        })
    }
    catch(e){
        console.log(e);
    }
        
};
controlador.Buscarunidadproductiva=(req, res)=>{
    try{
        var identificador = req.body.Identificacion;
        let sql = 'select * from unidades_productivas  where codigo_up='+identificador;
             conexion.query(sql,(err, rows)=>{
                if(!err){
                    res.json(rows);
                }
                else{
                    console.log("No se logro encontrar la unidad productiva"+err);
                }
            });  
    }
    catch(e){
        console.log(e)
    }  
};

controlador.ListaUnidadesProductivas = (req, res) => {
    try{
        var sql = "select * from unidades_productivas join personas on identificacion=fk_persona order by codigo_up Asc;";
        conexion.query(sql, (err, rows) => {
            if(!err){
                res.json(rows);
            }
            else{
                console.log("No see Pudo listar"+err);
            }
        });
    }
    catch(e){
        console.log(e);
    }
};

controlador.ActualizarUnidadProductiva = (req, res) =>{
    try{
        let id = req.body.Identificacion;
        let nombre = req.body.Nombre;
        let logo = req.fileNewName;
        let Descripcion = req.body.Descripcion;
        let Sede = req.body.Sede;
        let Estado = req.body.Estado;
        let Entrega = req.body.Entrega;
        let Persona = req.body.PersonaEncargada;
        let sql = `update unidades_productivas set Nombre='${nombre}', Logo='${logo}',Descripcion='${Descripcion}',sede='${Sede}',estado='${Estado}',entrega_producto='${Entrega}',
        fk_persona='${Persona}' where codigo_up='${id}'`;
            conexion.query(sql,(err, rows)=>{
                console.log(sql)
                if (err) return res.json({ 
                    titulo : "error",
                    icono: "error",
                    mensaje : "La Unidad Productiva no se Logro Actualizada "+ err,
                    timer : 2000
                });            
                return res.json({  
                    titulo : "Actualizado con Éxito",
                    icono: "success",
                    mensaje : "La Unidad Productiva ha sido Actualizada con Éxito",
                    timer : 2000
                });
        })
    }
    catch(e){
        console.log(e);
    }
}

module.exports = controlador;