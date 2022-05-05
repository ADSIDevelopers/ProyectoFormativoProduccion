const conexion = require('../database/conexion');
const controlador = {};

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, img, cb) {
        cb(null, "public/img/products");
    },
    filename: function(req, img, cb) {
        const datoahora = Date.now();
        req.fileNewName = datoahora + img.originalname;
        cb(null, req.fileNewName);
    }
});

const upload = multer({ storage: storage });
controlador.CargarImagen = upload.single('img');

controlador.Vista = (req, res) => {
    try{
        let sql = "select * from unidades_productivas";
        conexion.query(sql, (err, rows) => {
            if (!err) {
                res.render('admin/productos',{Unidadesproductivas:rows})
            } else {
                console.log('eror al redirigir a la vista de Productos ' + err)
            }
        });
    }
    catch(e){
        console.log(e);
    }
};

controlador.RegistrarProductos = (req, res) => {
    try{
    let nombre = req.body.Nombrepdto;
    let Descripcion = req.body.Descripcionpdto;
    let imagen = req.fileNewName;
    let estado = req.body.Estadopdto;
    let Reserva = req.body.Reservapdto;
    let Maximo = req.body.Maximopdto;
    let tipo = req.body.tipopdto;
    let up = req.body.unidapdtopdto;
        let sql = `insert into productos(Nombre,Descripcion,imagen,Estado,Reserva,MaxReserva,Tipo,fk_codigo_up) 
        values('${nombre}','${Descripcion}','${imagen}','${estado}','${Reserva}','${Maximo}','${tipo}','${up}')`;
        conexion.query(sql,(err, rows)=>{
            if (err) return res.json({ 
                titulo : "error",
                icono: "error",
                mensaje : "El Producto no se Logro Registrar "+ err,
                timer : 2000
            }); 
            return res.json({  
                titulo : "Registro Exitoso",
                icono: "success",
                mensaje : "El Producto Registrado con éxito",
                timer : 2000
            });
        });
    }
    catch(e){
        console.log(e)
    }
};

controlador.ListaProductos = (req, res) => {
    try{
        var sql = "select productos.Codigo_pdto as Codigo_pdto, unidades_productivas.Nombre as Nombre_up, productos.Nombre as Nombre_pdto, productos.imagen as Imgpdto, productos.MaxReserva as MaxReserva, productos.Reserva as Reserva, productos.Estado as Estado, productos.Descripcion as Descripcion, productos.Tipo as Tipo from unidades_productivas join productos on codigo_up=fk_codigo_up order by Codigo_pdto Asc";
        conexion.query(sql, (err, rows) => {
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

controlador.buscarpdto = (req, res) =>{
    try{
        var identificador = req.body.Identificacion;
        let sql = 'select productos.Codigo_pdto as Codigo_pdto, productos.Nombre as Nombre, productos.Descripcion as Descripcion, productos.Estado as Estado, productos.Reserva as Reserva, productos.MaxReserva as MaxReserva, productos.fk_codigo_up as fk_codigo_up, productos.tipo as tipo from productos  where Codigo_pdto='+identificador;
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
    };  
};
controlador.Actualizarproductos = (req, res) =>{
    try{
    let id = req.body.Identificacionact;
    let nombre = req.body.Nombrepdtoact;
    let Descripcion = req.body.Descripcionpdtoact;
    let img = req.fileNewName;
    let estado = req.body.Estadopdtoact;
    let Reserva = req.body.Reservapdtoact;
    let Maximo = req.body.Maximopdtoact;
    let tipo = req.body.tipopdtoact;
    let up = req.body.unidapdtopdtoact;
    let sql = `update productos set Nombre='${nombre}',
    Descripcion='${Descripcion}',
    imagen='${img}',
    Estado='${estado}',
    Reserva='${Reserva}',
    MaxReserva='${Maximo}',
    Tipo='${tipo}',
    fk_codigo_up='${up}' where Codigo_pdto='${id}'`;
    conexion.query(sql,(err, rows)=>{
        if (err) return res.json({ 
            titulo : "error",
            icono: "error",
            mensaje : "El Producto no se Logro Actualizar "+ err,
            timer : 2000
        });            
        return res.json({  
            titulo : "Actualizado con Exito",
            icono: "success",
            mensaje : "El Producto ha sido Actualizado con éxito",
            timer : 2000
        });
    });
    }
    catch(e){
        console.log(e);
    };
};

controlador.ListarPrecios = (req, res) =>{
    try{
        let codigopdto = req.body.idpdto;
        console.log(codigopdto)
        sql = "select precios.id_precio as id_precio, cargo.nombre_cargo as cargonombre, precios.precio as preciopdto, productos.Nombre as nombrepdto, precios.fk_producto as fk_producto, precios.fk_cargo as fk_cargo, productos.Codigo_pdto as Codigo_pdto from cargo join precios on idcargo=fk_cargo join productos on fk_producto=Codigo_pdto where Codigo_pdto="+codigopdto;
        conexion.query(sql, (err, rows) => {
            if (!err) {
                res.json(rows);
            } else {
                console.log('eror al listar la tabla de precios' + err);
            }
        });
    }
    catch(e){
        console.log(e)
    }
}; 

controlador.RegistrarPrecios = (req, res)=>{
    try{
        console.log(req.body)
        let pdto = req.body.pdto;
        let cargo = req.body.cargo;
        let precio = req.body.precio;
        let sql =`insert into precios(fk_producto,fk_cargo,precio) values('${pdto}','${cargo}','${precio}')`;              
        conexion.query(sql, (err, rows) => {
            if (!err) {
                if (err) return res.json({ 
                    titulo : "error",
                    icono: "error",
                    mensaje : "El Precio no se Logro Registrar "+ err,
                    timer : 2000
                }); 
                return res.json({  
                    titulo : "Registro Exitoso",
                    icono: "success",
                    mensaje : "El Precio ha sido Registrado con éxito",
                    timer : 2000
                });
            } 
            else {
               res.json({  
                    titulo : "Ya esta Registrado",
                    icono: "info",
                    mensaje : "El Precio ya se encuentra registrado",
                    timer : 2000
                });
            }
        });
    }
    catch(e){
        console.log(e)
    }
}

controlador.BuscarPrecio = (req, res)=>{
    try{
        var idpdto = req.body.Codigopdto;
        let sql = 'select * from productos  where codigo_pdto='+idpdto;
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
    }; 
}

controlador.Mostrarprecio  = (req, res)=>{
    try{
        var idsale = req.body.idsale;
        let sql = 'select * from precios  where id_precio='+idsale;
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
    }; 
}
controlador.ActualizarSale  = (req, res)=>{
    try{
        let idpdtosale = req.body.idpdto;
        var idsale = req.body.idsale;
        let cargosale = req.body.preciosale;
        let preciosale = req.body.cargosale;
        let sql = `update precios set  precio='${cargosale}',
        fk_producto='${idpdtosale}',
        fk_cargo='${preciosale}'
        where id_precio='${idsale}'`;
        conexion.query(sql, (err, rows) => {
            if (!err) {
                if (err) return res.json({ 
                    titulo : "error",
                    icono: "error",
                    mensaje : "El Precio no se Logro Actualizar "+ err,
                    timer : 5000
                }); 
                return res.json({  
                    titulo : "Actualizado con Exito",
                    icono: "success",
                    mensaje : "El Precio ha sido Actualizado con éxito",
                    timer : 5000
                });
            } else {
                console.log('eror al insertar valores a  precios' + err);
            }
        }); 
    }
    catch(e){
        console.log(e);
    }; 
}

module.exports = controlador;