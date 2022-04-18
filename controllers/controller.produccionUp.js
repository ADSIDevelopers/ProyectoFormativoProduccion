const controlador = {};

controlador.renderizarFrmProduccion = (req, res) => {
    res.render("produccionUp.ejs");
}
// controlador.registrarProduccion=(req,res)=>{
//     let codigo = req.body.idPdto;
//     let nomb = req.body.Nombre;
//     let desc = req.body.Descripcion;
//     let est = req.body.Estado;
//     console.log(nomb);
//     let sql= `insert into productos(Descripcion,Estado)values('${desc}','${est}')`;
//     console.log(sql);
//     conexion.query(sql,(err,rows)=>{
//         if(!err){
//             res.json({
//                 titulo: "Mensaje",
//                 mensaje: "Usuario registrado con éxito :)",
//                 icono: "success"
//             });
//         }
//         else{
//             res.json({
//                 titulo: "Error",
//                 mensaje: "Error " + err,
//                 icono: "error"
//             });
//         }
//     });
// }
module.exports = controlador;