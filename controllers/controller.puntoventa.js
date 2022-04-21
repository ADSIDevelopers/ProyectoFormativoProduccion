const conexion = require('../database/conexion');
const controlador = {};

controlador.Vista = (req, res) => {
    let sql = "select * from personas;";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.render('admin/puntoventa',{Personas:rows})
        } else {
            console.log('error al redirigir a la vista de puntos de venta ' + err)
        }
    });
};
controlador.ListaPuntoventa = (req, res) => {
  var dir = "";
    var sql = "select punto_venta.Estado as EstadoPVent, Id_punto_vent,Sede,Nombre,Nombres,fk_persona, personas.Direccion as dirPersona, punto_venta.Direccion as dirPunto from punto_venta join personas on fk_persona=identificacion";
    conexion.query(sql, (err, rows) => {
        if (!err) {
            console.log(rows);
            res.json(rows);
        } else {
            console.log("No se pudo listar!! "+err);
        }
    });
};
controlador.RegistrarPunto = (req, res)=>{
    let nombre = req.body.Nombre;
    let sede = req.body.Sede;
    let dir = req.body.Direccion;
    let estado = req.body.Estado;
    let persona = req.body.Persona;
    var sql = `insert into punto_venta(Sede,Direccion,Nombre,Estado, fk_persona)values('${sede}','${dir}','${nombre}','${estado}','${persona}')`
try{
    conexion.query(sql,(err,rows)=>{
        if (err) return res.json({ 
            titulo : "error",
            icono: "error",
            mensaje : "el punto de venta no se registro "+ err
        }); 
        return res.json({  
            titulo : "Registro Exitoso",
            icono: "success",
            mensaje : "El punto ha sido regsitrado con éxito"
        });
        
        });
    }
    catch(e){
       console.log(e);
    }
}

controlador.Buscarpuntv=(req, res)=>{
    var identificador = req.body.Identificacion;
    let sql = 'select * from punto_venta where Id_punto_vent='+identificador;
 
         conexion.query(sql,(err, rows)=>{
            if(!err){
                res.json(rows);
            }
            else{
                console.log("No see pudo listar el punto de venta"+error);
            }
        });    
};
controlador.Actualformpuntv=(req, res)=>{
    var identificador = req.body.Identificacion;
    let nombre = req.body.Nombre;
    let sede = req.body.Sede;
    let direccion = req.body.Direccion;
    let estado = req.body.Estado;
    let PersonaEncargada = req.body.PersonaEncargada;
    let sql = `update punto_venta set Nombre='${nombre}',
                Sede='${sede}',
                Estado='${estado}',
                Direccion='${direccion}',
                fk_persona='${PersonaEncargada}'  where Id_punto_vent=${identificador}`;
    try{
        console.log(sql)
        conexion.query(sql,(err, rows)=>{
        if (err) return res.json({ 
            titulo : "error",
            icono: "error",
            mensaje : "el punto de venta no se Actualizo "+ err
        }); 
        return res.json({  
            titulo : "Registro Exitoso",
            icono: "success",
            mensaje : "El punto ha sido Actualizado con éxito"
        });
        });
    }catch(e){
        console.log(e);
     }
};



module.exports = controlador;