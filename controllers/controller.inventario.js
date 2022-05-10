const conexion = require('../database/conexion');
const query = require('../database/pool-conexion');
const controlador = {};

controlador.Vista = (req, res) => {
    try{
        var Pvent;
        var pdto;
        var sql = "select * from productos";
        conexion.query(sql,(err,rows)=>{
            if (!err) {
                pdto=rows;
            } else {
                console.log('error de ejecución de la consulta sql '+ err)
            }
        });
        var sql1 = "select * from punto_venta";
        conexion.query(sql1,(err,rows)=>{
            if (!err) {
                res.render('admin/inventario',{Datos:rows, Productos:pdto, PVenta:rows})
            } else {
                console.log('error de ejecución de la consulta sql '+ err)
            }
        });
        var sql2 = "select * from inventario"
    }
    catch(e){
        console.log(e);
    }
};
controlador.ListaInventario = (req, res) => {
    try{
        var sql = "select id_inventario,stock,fk_codigo_pdto,fk_id_punto_vent, punto_venta.Nombre as nombrePunto, productos.Nombre as nombrePdto, productos.Codigo_pdto as Codigo_pdto, punto_venta.Id_punto_vent as Id_punto_vent  from productos INNER JOIN inventario on fk_codigo_pdto=Codigo_pdto INNER JOIN punto_venta ON Id_punto_vent=fk_id_punto_vent";
        conexion.query(sql, (err, rows) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log("No se pudo listar!! "+err);
            }
        }); 
    }
    catch(e){
        console.log(e);
    } 
};
controlador.registrarInventario =(req, res)=>{
try{
    let stock = req.body.stock;
    let pdto = req.body.pdto;
    let Pvent = req.body.Pventa;
    var sql = `insert into inventario(stock,fk_codigo_pdto,fk_id_punto_vent)values('${stock}','${pdto}','${Pvent}')`;
     conexion.query(sql,(err,rows)=>{
        if (err) return res.json({ titulo : "error",
        icono: "error",
        mensaje : "el inventario no se registro "+ err}) 
        return res.json({  
        titulo : "Registro Exitoso",
        icono: "success",
        mensaje : "El inventario ha sido regsitrado con éxito"});
        
    });
    }catch(e){
       console.log(e);
    }
}
controlador.BuscarInvent=(req, res)=>{
    try{
        var identificador = req.body.Identificacion;
            let sql = 'select * from  inventario where id_inventario='+identificador;
                conexion.query(sql,(err, rows)=>{
                    if(!err){
                        res.json(rows);
                    }
                    else{
                        console.log("No se logro encontrar el inventario"+error);
                    }
                });    
    }
    catch(e){
    console.log(e);
 }  
};


controlador.pdtoinventario =(req, res)=>{
    try{
        let dtoinventario = req.body.idptoinve;
        let sql =`select * from productos  where codigo_pdto=`+dtoinventario;
            conexion.query(sql,(err, rows)=>{
                if(!err){   
                    res.json(rows); 
                }
                else{
                    console.log("No se logro encontrar el producto"+err);
                }
            }); 
    }
    catch(e){
        console.log(e);
    }
}

controlador.ListaProduccion=(req, res)=>{
    try{
        let idprdto = req.body.idptoibv;
        let sql =`SELECT lup.Id_produccion,date_format(lup.fecha, "%d-%m-%Y") as fecha,lup.codigo_pdto,lup.producto,lup.Producido,if(lup.distribuido is null,0,Distribuido) as Distribuido,if (lup.Disponible is null,0,Disponible) as Disponible FROM Lista_Produccion_Up lup
        where lup.codigo_pdto='${idprdto}'`;
        conexion.query(sql,(err, rows)=>{
            if(!err){   
                res.json(rows); 
            }
            else{
                console.log("No se logro listar la Produccion"+err);
            }
        }); 
    }
    catch(e){
        console.log(e);
    }
}

controlador.ListarBodega =(req, res)=>{
    try{
        let idproduccion = req.body.idproducci;
        let sql =`select punto_venta.Nombre as Nombrepunt, bodega.id_bodega as id_bodega, date_format(bodega.fecha, "%d-%m-%Y") as fechabodega, bodega.cantidad as cantidadbodega from produccion  join bodega on fk_produccion=Id_produccion join inventario on fk_inventario=id_inventario join punto_venta on fk_id_punto_vent=Id_punto_vent where fk_produccion='${idproduccion}'`;
        conexion.query(sql,(err, rows)=>{
            if(!err){   
                res.json(rows); 
            }
            else{
                console.log("No se logro listar la Bodega"+err);
            }
        }); 
    }
    catch(e){
        console.log(e);
    }
}

controlador.Nombrepunt  =(req, res)=>{
    try{
        let idputv = req.body.idpunto;
        let sql =`select inventario.id_inventario as id_inventario, productos.Nombre as nombrepdto, punto_venta.Nombre as nombrepuntv from productos join inventario on fk_codigo_pdto=Codigo_pdto join punto_venta on Id_punto_vent=fk_id_punto_vent where id_inventario='${idputv}'`;
        conexion.query(sql,(err, rows)=>{
            if(!err){   
                res.json(rows); 
            }
            else{
                console.log("No se logro listar la Bodega"+err);
            }
        }); 
    }
    catch(e){
        console.log(e);
    }
}

controlador.valoresproduccion = (req, res)=>{
    try{
        let idproduccion = req.body.idproduccion;
        let sql =`SELECT lup.id_produccion,lup.disponible FROM Lista_Produccion_Up lup where id_produccion='${idproduccion}'`;
        conexion.query(sql,(err, rows)=>{
            if(!err){   
                res.json(rows); 
            }
            else{
                console.log("No se logro llamar la Produccion"+err);
            }
        }); 
    }
    catch(e){
        console.log(e);
    }
}
controlador.Actualizarinventario = async(req, res)=>{
    try{
        let operacion = req.body.operacion;
        let cantidad = req.body.cantidad;
        let fkproduccion  = req.body.fk_produccion;
        let fkinventario = req.body.fk_inventario;
        let validacion = await query(`select Distribuido,  Disponible, Producido from Lista_Produccion_Up where Id_produccion = '${fkproduccion}'`);
        let distribucion = validacion[0].Distribuido;
        let disponibles = validacion[0].Disponible;
        let produccion = validacion[0].Producido;
        let cantidades = null
        if(distribucion == cantidades && disponibles == cantidades){
            if( cantidad > produccion ){
                return res.json({  
                    titulo : "Atención",
                    icono: "warning",
                    mensaje : "Sobrepasa el stock Producido",
                    timer : 1800
                });
            } 
        }
        if(distribucion != cantidades && disponibles != cantidades){
            if(cantidad > disponibles){
                return res.json({  
                    titulo : "Atención",
                    icono: "warning",
                    mensaje : "Sobrepasa el Stock Disponible",
                    timer : 1800
                });
            }

        }
        let sql = `CAll Administrar_inventario('${operacion}',${cantidad},${fkproduccion},${fkinventario})`
        await conexion.query(sql,(err, rows)=>{
            if(!err){   
                if (err) return res.json({ 
                    titulo : "error",
                    icono: "error",
                    mensaje : "El Inventario no se Logro Actualizar "+ err,
                    timer : 2000
                }); 
                return res.json({  
                    titulo : "Actualizado con Exitoso",
                    icono: "success",
                    mensaje : "El Inventario ha sido Actulizado con éxito",
                    timer : 2000
                });
            }
            else{
                console.log("No se logro Actualizar el Inventario"+err);
            }
        }); 
        
    }
    catch(e){
        console.log(e);
    }
}
module.exports = controlador;