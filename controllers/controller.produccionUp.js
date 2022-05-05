const controlador = {};
const conexion = require("../database/conexion");


//Controlador para listar produccion
controlador.Listar_Produccion=(req,res)=>{
    try{
        let sesionUP = 2;
        var sql = `select Id_produccion,Cantidad,DATE_FORMAT(produccion.fecha,'%d-%m-%Y') as fecha,Observacion, productos.Nombre from produccion join productos on Codigo_pdto = fk_codigo_pdto where fk_codigo_up='${sesionUP}' order by Id_produccion desc`;
        console.log(sql)
        conexion.query(sql, (err, rows) => {
            console.log(rows)
            if (!err) {
                res.json(rows);
            } else {
                console.log('eror al listar la tabla de productos' + err);
            }
        });
    }
    catch(e){
        console.log(e)
    }
};
controlador.Produccion=(req,res)=>{
    var sesionUP = 2; //OJO VARIABLE DE SESION DE LA UNIDAD PRODUCTIVA
    let sql =("select * from produccion  join productos on codigo_pdto=fk_codigo_pdto where fk_codigo_up="+ sesionUP );
    let produccion = "";
    conexion.query(sql,(err,rows)=>{
        if(!err){
           produccion =rows;
        }
        else{
            console.log('error' + err);
        }
    });
    let sql1 = 'select Codigo_pdto,unidades_productivas.Nombre as up, productos.Nombre as Productos from productos join unidades_productivas on fk_codigo_up=codigo_up where codigo_up='+sesionUP;
    conexion.query(sql1,(err,rows)=>{
        if(!err){
           
            res.render('admin/produccionUp.ejs',{produccion,pdto:rows});
        }
        else{
            console.log('error' + err);
        }
    });
}



controlador.RegistrarProduccion=(req,res)=>{

  //  let id = req.body.Id_produccion;
    let cant = req.body.Cantidad;
    let obs= req.body.Observacion;
    let fkp = req.body.fkp;

    let sql= `insert into produccion(Cantidad,Observacion,fecha,fk_codigo_pdto) 
    values('${cant}','${obs}',CURDATE(),'${fkp}')`;
    console.log(sql);
    conexion.query(sql,(err,rows)=>{
        if(err)return res.json({titulo: "Error",
        icono: "Error",
        mensaje: "La producción no fue registrada "+ err})
    return res.json({
        titulo: "Registro exitoso",
        icono: "success",
        mensaje: "La producción fue registrada con éxito"})
    });
}




module.exports = controlador;