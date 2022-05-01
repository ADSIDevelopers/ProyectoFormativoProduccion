const conexion = require('../database/conexion');
const controlador = {};

controlador.Vista = (req, res) => {
    try{
        let sql = "select * from personas;";
        conexion.query(sql, (err, rows) => {
            if (!err) {
                res.render('admin/puntoventa',{Personas:rows})
            } else {
                console.log('error al redirigir a la vista de puntos de venta ' + err)
            }
        });
    }
    catch(e){
        console.log(e)
    }
};
controlador.ListaPuntoventa = (req, res) => {
    try{
        var sql = "select punto_venta.Estado as EstadoPVent, Id_punto_vent,Sede,Nombre,Nombres,fk_persona, personas.Direccion as dirPersona, punto_venta.Direccion as dirPunto from punto_venta join personas on fk_persona=identificacion";
        conexion.query(sql, (err, rows) => {
            if (!err) {
                console.log(rows);
                res.json(rows);
            } else {
                console.log("No se pudo listar!! "+err);
            }
        });
    }
    catch(e){
        console.log(e)
    }
};
controlador.RegistrarPunto = (req, res)=>{
try{
    let nombre = req.body.Nombre;
    let sede = req.body.Sede;
    let dir = req.body.Direccion;
    let estado = req.body.Estado;
    let persona = req.body.Persona;
    var sql = `insert into punto_venta(Sede,Direccion,Nombre,Estado, fk_persona)values('${sede}','${dir}','${nombre}','${estado}','${persona}')`;
    conexion.query(sql,(err,rows)=>{
            if (err) return res.json({ 
                titulo : "error",
                icono: "error",
                mensaje : "el punto de venta no se registro "+ err,
                timer : 2000
            }); 
            return res.json({  
                titulo : "Registro Exitoso",
                icono: "success",
                mensaje : "El punto ha sido regsitrado con éxito",
                timer : 2000
            });
        });
    }
    catch(e){
       console.log(e);
    }
}

controlador.Buscarpuntv=(req, res)=>{
    try{
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
    }
    catch(e){
        console.log(e);
    }
};
controlador.Actualformpuntv=(req, res)=>{
    try{
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
        console.log(sql)
        conexion.query(sql,(err, rows)=>{
        if (err) return res.json({ 
            titulo : "error",
            icono: "error",
            mensaje : "el punto de venta no se Actualizo "+ err,
            timer : 2000
        }); 
        return res.json({  
            titulo : "Actualizado con Exito",
            icono: "success",
            mensaje : "El punto ha sido Actualizado con éxito",
            timer : 2000
        });
        });
    }catch(e){
        console.log(e);
    }
};



module.exports = controlador;