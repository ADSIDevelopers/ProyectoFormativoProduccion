const controlador = {};
const conexion = require("../database/conexion");

controlador.Listar_Productos = (req, res) => {

    var sesion_Cargo = 1; // Ojo esta es la asesion del cargo de la persona
    let sql='';
    if(sesion_Cargo==1){
        sql = `select id_inventario,Producto as producto,descripcion,imagen,reserva,stock,nomb_up as up,aprendiz as precio,Nombre as pv    from Lista_Productos  `;
    }
    if(sesion_Cargo==2){
        sql = `select id_inventario,Producto as producto,descripcion,imagen,reserva,stock,nomb_up as up,instructor as precio,Nombre as pv    from Lista_Productos  `;
    }
    if(sesion_Cargo==3){
        sql = `select id_inventario,Producto as producto,descripcion,imagen,reserva,stock,nomb_up as up,administrativo as precio,Nombre as pv    from Lista_Productos  `;
    }
    if(sesion_Cargo==4){
        sql = `select id_inventario,Producto as producto,descripcion,imagen,reserva,stock,nomb_up as up,externo as precio,Nombre as pv    from Lista_Productos  `;
    }

    if(sesion_Cargo==5){
        sql = `select id_inventario,Producto as producto,descripcion,imagen,reserva,stock,nomb_up as up,auxiliares as precio,Nombre as pv    from Lista_Productos  `;
    }

    conexion.query(sql, (err, rows) => {
        if (!err) {
           
            res.render('reserva.ejs', { Productos: rows });

        }
        else {
            console.log('error Al listar los Productos ' + err);
        }
    });
}
controlador.Buscar_Producto = (req, res) => {
    let name = req.body.Codigo;
    let sql = "select Nombre from producto where Codigo_pdto=" + name;
    console.log(sql)
    conexion.query(sql, (err, rows) => {
        if (!err) {
            res.json(rows);
        }
        else {
            console.log('error' + err);
        }
    });
}

controlador.Listar_Reservas_Pendientes = (req, res) => {

    var sesion_persona =1007163342 ; // ojo esta es de la sesion 1007163342
 
    let sql1 = `call Administrar_Reserva('Buscar_Reserva',${sesion_persona})`;;
    //console.log(sql1);
 
    try {
        conexion.query(sql1, (err, rows) => {
            if(err) return console.log('error' + err); 
           //console.log(rows[0]);
            res.json(rows[0]);
        });
    } catch (e) {
        console.log("error sss: " + e)
    }



    
}

controlador.Listar_Usuaios_Ficha = (req, res) => {
    sql = `SELECT identificacion,Nombres FROM personas where Ficha = '${req.body.idFicha}'`
    try{
        conexion.query(sql, (err, rows) => {

          
            if(err) return console.log("error" + err);
            if(rows.length <= 0) return res.json({status: '404', message: 'Ficha no encontrada'})
            return res.json(rows)
        });
    } catch (e) {
        console.log(e)
    }
}

controlador.Registrar_Detalle = (req, res) => {
    var sesion_Cargo = 1;
    // ojo aqui no se necesita la sesion de persona, viene desde la interfaz
    var persona = req.body.persona;
    var cantidad = req.body.cantidad;
    var movimiento = req.body.id_movimiento;
    var inventario = req.body.id_producto;

    if(sesion_Cargo==1){
        sql = `select aprendiz as precio from Lista_Productos where id_inventario = '${inventario}' LIMIT 1;`;
    }
    if(sesion_Cargo==2){
        sql = `select instructor as precio from Lista_Productos where id_inventario = '${inventario}' LIMIT 1;`;
    }
    if(sesion_Cargo==3){
        sql = `select administrativo as precio from Lista_Productos where id_inventario = '${inventario}' LIMIT 1;`;
    }
    if(sesion_Cargo==4){
        sql = `select externo as as precio from Lista_Productos where id_inventario = '${inventario}' LIMIT 1;`;
    }

    if(sesion_Cargo==5){
        sql = `select auxiliar as precio from Lista_Productos where id_inventario = '${inventario}' LIMIT 1;`;
    }

                     //   let sqlValidacion = "SELECT * FROM detalle where Persona = '"+persona+"'"
    try {

        conexion.query(sql, (err, rows) => {
            if (err) return res.json({ 
                titulo : "error",
                icon: "error",
                text : "La reserva no se registro "+ err
            }); 
            var precioProducto = rows[0].precio;
            /* =================================== */
            let sqlDetalle = `INSERT INTO detalle (cantidad, valor, Estado, Persona, fk_Id_movimiento, fk_id_inventario) 
                        VALUES (${cantidad}, ${precioProducto}, 'Reservado', ${persona}, ${movimiento}, ${inventario})`

            conexion.query(sqlDetalle, (err, rows) => {
                return res.json({  
                    titulo : "Registro Exitoso",
                    icon: "success",
                    text : "La reserva ha sido registrada con éxito"
                });
            });
            
        });
    } catch (err) {
        console.log(err)
    }



}
controlador.Eliminar_Detalle = (req, res) => {
    var idDetalle = req.body.id_detalle;
    if(!req.body.id_detalle) return res.json({status: 404, message: 'Detalle no encontrado'})
  
   let sql = `DELETE FROM detalle where id_detalle =`+idDetalle; 
    try{
        conexion.query(sql, (err, rows) => {
            if(err) return console.log("error" + err);
            return res.json({status: 200, message: 'Detalle eliminado con éxito'})
        });
    } catch (err) {
        console.log(err);
    }
    
}



module.exports = controlador;