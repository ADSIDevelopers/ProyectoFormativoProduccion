const conexion = require('../database/conexion');
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
                console.log('error de ejución de la consulta sql '+ err)
            }
        });
        var sql1 = "select * from punto_venta";
        conexion.query(sql1,(err,rows)=>{
            if (!err) {
                Pvent=rows;
            } else {
                console.log('error de ejución de la consulta sql '+ err)
            }
        });
        var sql2 = "select * from inventario"
        conexion.query(sql2,(err,rows)=>{
            if (!err) {
                res.render('admin/inventario',{Datos:rows, Productos:pdto, PVenta:Pvent})
            } else {
                console.log('error al redirigir a la vista de puntos de venta ' + err)
            }
        });
    }
    catch(e){
        console.log(e);
    }
};
controlador.ListaInventario = (req, res) => {
    try{
        var sql = "select id_inventario,stock,fk_codigo_pdto,fk_id_punto_vent, punto_venta.Nombre as nombrePunto, productos.Nombre as nombrePdto, productos.Codigo_pdto as Codigo_pdto, punto_venta.Id_punto_vent as Id_punto_vent  from productos INNER JOIN inventario on fk_codigo_pdto=Codigo_pdto INNER JOIN punto_venta ON Id_punto_vent=fk_id_punto_vent";
        conexion.query(sql, (err, rows) => {
            console.log(rows);
            if (!err) {
                res.json(rows);
            } else {
                console.log("No se pudo listar!! "+error);
            }
        }); 
    }
    catch(e){
        console.log(e);
    } 
};
controlador.registrarInventario = (req, res)=>{
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
        console.log(identificador);
            let sql = 'select * from  inventario where id_inventario='+identificador;
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
controlador.ActualformInvent=(req, res)=>{
    try{
        var identificador = req.body.Identificacion;
        let stock = req.body.Stock;
        let producto = req.body.Producto;
        let puntoVent = req.body.PuntoVent;
        let sql = `update inventario set stock='${stock}',
                    fk_codigo_pdto='${producto}',
                    fk_id_punto_vent='${puntoVent}'  where id_inventario=${identificador}`;
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
    }
    catch(e){
        console.log(e);
    }
};

controlador.pdtoinventario =(req, res)=>{
    try{
        let dtoinventario = req.body.idptoinve;
        let sql =`select * from productos  where codigo_pdto=`+dtoinventario;
        console.log(sql)
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
        let sql =`select produccion.Id_produccion AS Id_produccion,
            date_format(produccion.fecha, "%d-%m-%Y") AS fecha,
            productos.Codigo_pdto AS Codigo_pdto,
            productos.Nombre AS producto,
            produccion.Cantidad AS Producido,
            (select sum(bodega.cantidad) from bodega where (bodega.fk_produccion = produccion.Id_produccion)) as Distribuido,
            (produccion.cantidad - (select sum(bodega.cantidad) from bodega where (bodega.fk_produccion = produccion.Id_produccion))) as Disponible from 
            ((produccion join productos on ((productos.Codigo_pdto=produccion.fk_codigo_pdto)))
            join unidades_productivas on ((unidades_productivas.codigo_up = productos.fk_codigo_up))
            ) where codigo_pdto='${idprdto}'`;
        console.log(sql)
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
        console.log(sql)
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

controlador.valoresproduccion =(req, res)=>{
    try{
        let idproduccion = req.body.idproduccion;
        let sql =`select produccion.Id_produccion AS Id_produccion,
        (produccion.cantidad - (select sum(bodega.cantidad) from bodega where (bodega.fk_produccion = produccion.Id_produccion))) as Disponible from 
        ((produccion join productos on ((productos.Codigo_pdto=produccion.fk_codigo_pdto)))
        join unidades_productivas on ((unidades_productivas.codigo_up = productos.fk_codigo_up))

        ) where Id_produccion='${idproduccion}'`;
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
controlador.Actualizarinventario=async(req, res)=>{
    try{
        let operacion = req.body.operacion;
        let cantidad = req.body.cantidad;
        let fkproduccion  = req.body.fk_produccion;
        let fkinventario = req.body.fk_inventario;
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
                conexion.end();
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

module.exports = controlador;