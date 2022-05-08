const conexion = require('../database/conexion');
let controlador = {};

/* ==================select del cargo================ */
controlador.renderRegistroCliente  = (req, res) =>{
    var sql = "select * from  cargo"
    try {
        conexion.query(sql,(err,rows,fields)=>{
            if(!err) res.render('admin/RegistroCliente', {Datos:rows, profile: {Nombres: 'Jhon Mario', Cargo: 'Perro'}})
            else {
                console.log(err);
            }
        });
    } catch(e) {

    }
   
   
}
/* ==================listar usuarios================= */
controlador.Listar_Usuarios = (req, res)=>{
    var sql ="SELECT identificacion,Nombres,Correo,Direccion,Telefono,Ficha,nombre_cargo as Cargo, Rol, if (Estado=1,'Activo','Inactivo') as Estado FROM personas join cargo on Cargo=cargo.idcargo";
    try{
        conexion.query(sql,(err,rows)=>{
            if(err) return res.json({status: 400, msg: 'Error' + err})
            return res.json(rows);
        });
    } catch(e){
        console.log(e);
    }
    
}

/* ==================registrar============= */
controlador.RegistroCliente = (req,res)=>{
    /* res.send('Respuesta del Servidor'); */
     let ide = req.body.identificacion;
     let nomb = req.body.nombre;
     let corre = req.body.correo;
     let direccion = req.body.direccion;
     let telefono = req.body.telefono;
     let ficha = req.body.ficha;
     let cargo = req.body.cargo;
     let rol = req.body.rol;
     let estado = req.body.estado;
     /* usuarios */
     let user = req.body.user;
     let pas= req.body.pass;
/* 
     console.log('usuario', user +" cargo "+cargo + " estado " +estado); */
    /*==================== inyeccion sql============ */
     var sql = `insert into personas(identificacion,Nombres,Correo,Login,Password,Direccion,Telefono,Ficha,Cargo,Rol,Estado)values(${ide},'${nomb}','${corre}','${user}','${pas}','${direccion}','${telefono}','${ficha}','${cargo}','${rol}','${estado}')`;

    try{
        conexion.query(sql,(err,rows)=>{
            if(err) return res.json({status: 400, msg: 'Error' +err})
            return res.json({status:200, msg: 'Registrado con Exito'});
        });
    }catch(e){
        return res.json({status:400, msg: 'Error'+err});
    }
     
};

/* ================Actualizar=========== */
controlador.buscar= (req,res)=>{
    var iden = req.body.identificacion;
    var sql ="select * from personas where identificacion="+iden;
    try{
        conexion.query(sql,(err,rows)=>{
            if(err) return res.json({status: 400, msg: 'Error' + err})
            return res.json(rows[0]);
        });
    } catch(e){
        console.log(e);
    }
    
}
/* botonactualizar */
controlador.actualizar = (req,res)=>{
    let ide = req.body.identificacion;
    let nomb = req.body.nombre;
    let corre = req.body.correo;
    let direc = req.body.direccion;
    let tel = req.body.telefono;
    let ficha = req.body.ficha;
    let cargo = req.body.cargo;
    let rol = req.body.rol;
    let estado = req.body.estado;
    
    var sql = `update  personas set identificacion=${ide},Nombres='${nomb}',Correo='${corre}',Direccion='${direc}',Telefono='${tel}',Ficha='${ficha}',Cargo='${cargo}',Rol='${rol}',Estado='${estado}' where identificacion=${ide}`;
  
   try{
       conexion.query(sql,(err,rows)=>{
           if(err) return res.json({status: 400, msg: 'Error' +err})
           console.log(rows);
           return res.json({status:200, msg: 'Registrado con Exito'});
       });
   }catch(e){
       return res.json({status:400, msg: 'Error'+err});
   }
}


module.exports = controlador;


/*      =========    ======== ======= ======
        =       =   =       = =======  = =    =
        =         =         = =     = =    =*/