const conexion = require('../database/conexion');
const controlador = {};

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, img, cb) {
        cb(null, "public/img/products");
    },
    filename: function(req, img, cb) {
        cb(null, img.originalname);
    }
});

const upload = multer({ storage: storage });
controlador.CargarImagen = upload.single('img');


controlador.Vista = (req, res) => {
    try{
        let sql = "select * from unidades_productivas;";
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
    let imagen = req.file.originalname;
    let estado = req.body.Estadopdto;
    let Reserva = req.body.Reservapdto;
    let Maximo = req.body.Maximopdto;
    let up = req.body.unidapdtopdto;
        let sql = `insert into productos(Nombre,Descripcion,imagen,Estado,Reserva,MaxReserva,fk_codigo_up) 
        values('${nombre}','${Descripcion}','${imagen}','${estado}','${Reserva}','${Maximo}','${up}')`;
        console.log(sql)
        conexion.query(sql,(err, rows)=>{
            if (err) return res.json({ 
                titulo : "error",
                icono: "error",
                mensaje : "El Producto no se Logro Registrar "+ err,
                timer : 5000
            }); 
            return res.json({  
                titulo : "Registro Exitoso",
                icono: "success",
                mensaje : "El Producto Registrado con éxito",
                timer : 5000
            });
        });
    }
    catch(e){
        console.log(e)
    }
};

controlador.ListaProductos = (req, res) => {
    try{
        var sql = "select unidades_productivas.Nombre as Nombre_up, productos.Nombre as Nombre_pdto, productos.Codigo_pdto as Codigo_pdto, productos.MaxReserva as MaxReserva, productos.Reserva as Reserva, productos.Estado as Estado, productos.Descripcion as Descripcion from unidades_productivas join productos on codigo_up=fk_codigo_up;";
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
        let sql = 'select * from productos  where Codigo_pdto='+identificador;
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
    let img = req.file.originalname;
    let estado = req.body.Estadopdtoact;
    let Reserva = req.body.Reservapdtoact;
    let Maximo = req.body.Maximopdtoact;
    let up = req.body.unidapdtopdtoact;
    let sql = `update productos set Nombre='${nombre}',
    Descripcion='${Descripcion}',
    imagen='${img}',
    Estado='${estado}',
    Reserva='${Reserva}',
    MaxReserva='${Maximo}',
    fk_codigo_up='${up}' where Codigo_pdto='${id}'`;
    console.log(sql);
    conexion.query(sql,(err, rows)=>{
        console.log(sql);
        if (err) return res.json({ 
            titulo : "error",
            icono: "error",
            mensaje : "El Producto no se Logro Actualizada "+ err,
        });            
        return res.json({  
            titulo : "Registro Exitoso",
            icono: "success",
            mensaje : "El Producto ha sido Actualizada con éxito",
        });
    });
    }
    catch(e){
        console.log(e);
    };
};

module.exports = controlador;