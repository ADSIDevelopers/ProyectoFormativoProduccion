const conexion = require('../database/conexion');
const controlador = {};

controlador.Vista = (req, res) => {
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
};
controlador.ListaInventario = (req, res) => {
    var sql = "select id_inventario,stock,fk_codigo_pdto,fk_id_punto_vent, punto_venta.Nombre as nombrePunto, productos.Nombre as nombrePdto from productos INNER JOIN inventario on fk_codigo_pdto=Codigo_pdto INNER JOIN punto_venta ON Id_punto_vent=fk_id_punto_vent";
    conexion.query(sql, (err, rows) => {
        console.log(rows);
        if (!err) {
            res.json(rows);
        } else {
            console.log("No se pudo listar!! "+error);
        }
    });  
};
controlador.registrarInventario = (req, res)=>{
    let stock = req.body.stock;
    let pdto = req.body.pdto;
    let Pvent = req.body.Pventa;
   
    var sql = `insert into inventario(stock,fk_codigo_pdto,fk_id_punto_vent)values('${stock}','${pdto}','${Pvent}')`
try{
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
};
controlador.ActualformInvent=(req, res)=>{
    var identificador = req.body.Identificacion;
    let stock = req.body.Stock;
    let producto = req.body.Producto;
    let puntoVent = req.body.PuntoVent;

    let sql = `update inventario set stock='${stock}',
                fk_codigo_pdto='${producto}',
                fk_id_punto_vent='${puntoVent}'  where id_inventario=${identificador}`;
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