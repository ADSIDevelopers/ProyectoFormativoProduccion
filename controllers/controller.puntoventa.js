const conexion = require('../database/conexion');
const controlador = {};

controlador.Vista = (req, res) => {
    res.render('puntoventa.ejs')
};
controlador.ListaPuntoventa = (req, res) => {
    var sql = "select * from punto_venta;";
    conexion.query(sql, (err, rows) => {
        console.log(rows);
        if (!err) {
            res.json(rows);
        } else {
            console.log("No se pudo listar!! "+error);
        }
    });
};
controlador.RegistrarPunto = (req, res)=>{
    let nombre = req.body.Nombre;
    let sede = req.body.Sede;
    let dir = req.body.Direccion;
    let persona = req.body.Persona;
    var sql = `insert into punto_venta(Sede,Direccion,Nombre,fk_persona)values('${sede}','${dir}','${nombre}','${persona}')`
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
    console.log(sql)
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
    let id = req.body.Identificacion;
    let nombre = req.body.Nombre;
    let sede = req.body.Sede;
    let direccion = req.body.Direccion;
    let PersonaEncargada = req.body.PersonaEncargada;
    let sql = `update punto_venta set Nombre='${nombre}',
                Sede='${sede}',
                Direccion='${direccion}',
                fk_persona='${PersonaEncargada}'  where Id_punto_vent=${id}`;
    console.log(sql)
    try{
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