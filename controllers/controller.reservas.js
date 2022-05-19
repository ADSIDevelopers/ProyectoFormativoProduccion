const controlador = {};
const conexion = require("../database/conexion");
const query = require("../database/pool-conexion");

controlador.Listar_Productos = async(req, res) => {
    var sesion_Cargo = req.session.id_cargo; 
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
    try{
        let productos = await query(sql);
        res.render('reservas/reserva.ejs', { Productos: productos });
    } catch (e){
        console.log(e)
    }
}
controlador.Buscar_Producto = async(req, res) => {
    let name = req.body.Codigo;
    let sql = "select Nombre from producto where Codigo_pdto=" + name;
    try {
        let rows = await query(sql);
        return res.json(rows);
    } catch(e){
        console.log(e)
    }
}
controlador.Listar_Reservas_Pendientes = async(req, res) => {
    var sesion_persona = req.session.identificacion ; 
    let sql1 = `call Administrar_Reserva('Buscar_Reserva',${sesion_persona})`;;
    try {
        let rows = await query(sql1);
        return res.json(rows[0]);
    } catch (e) {
        console.log("error: " + e)
    } 
}
controlador.Listar_Usuaios_Ficha =  async(req, res) => {
    sql = `SELECT identificacion,Nombres FROM personas where Ficha = '${req.body.idFicha}'`
    try{
        let rows = await query(sql);
        if(rows.length <= 0) return res.json({status: '404', message: 'Ficha no encontrada'})
        return res.json(rows)
    } catch (e) {
        console.log(e)
    }
}

controlador.Registrar_Detalle = async(req, res) => {
    var sesion_Cargo = req.session.id_cargo; 
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
    try {
        let rows = await query(sql);
        var precioProducto = rows[0].precio;
        /* =====consulta detalle======= */
        let sqlDetalle = `INSERT INTO detalle (cantidad, valor, Estado, Persona, fk_Id_movimiento, fk_id_inventario) 
        VALUES (${cantidad}, ${precioProducto}, 'Reservado', ${persona}, ${movimiento}, ${inventario})`;
        await query(sqlDetalle);
        
        return res.json({  
            titulo : "Registro Exitoso",
            icon: "success",
            text : "La reserva ha sido registrada con éxito"
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
            return res.json({  
                titulo : "Producto Eliminado",
                icon: "success",
                text : "Producto eliminado de reserva"
            });
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports = controlador;