const controlador = {};

controlador.renderizarFrmReservas = (req, res) => {
    res.render("venta.ejs");
}
controlador.MostrarPdto=(req, res)=>{
    var sql= "select Nombre from productos";
    conexion.query(sql,(err,rows)=>{
        if(!err){
            res.text(rows);
        }
        else{
            console.log('Error al listar '+ err)
        }
    });
}
module.exports = controlador;