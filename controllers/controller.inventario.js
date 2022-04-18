const conexion = require('../database/conexion');
const controlador = {};

controlador.Vista = (req, res) => {
    res.render('inventario.ejs')
};

controlador.ListaInventario = (req, res) => {
    var sql = "select * from inventario;";
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

module.exports = controlador;