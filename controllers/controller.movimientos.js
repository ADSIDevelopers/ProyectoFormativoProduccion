let controladorMovimiento = {};
const res = require("express/lib/response");
const { json } = require("express/lib/response");
let conexion = require("../database/conexion");

controladorMovimiento.renderMovimientos = (req, resp) => {
    resp.render("admin/movimientos");
};

controladorMovimiento.listarProductos = (req, resp) => {
    try {
        let sql = `select * from Lista_Productos `;
        conexion.query(sql, (err, rows) => {
            resp.json(rows);
        });
    } catch (error) {
        console.log("Error al Listar los Productos: " + error);
    }
};



/* =================controlador agregar================ */
controladorMovimiento.consAggProd = (req, resp) => {
    var id = req.body.codigop;
    let cargoSesion = "Instructor";
    try {
        let sql = `select * from Lista_Productos where id_inventario=` + id;
        conexion.query(sql, (err, rows) => {
            resp.json(rows);
            console.log(rows)
        });
    } catch (error) {
        console.log("Error al Listar los Productos: " + error);
    }
};


module.exports = controladorMovimiento;

/* ==================filtro busqueda clientes=============== */
controladorMovimiento.filtro = (req, resp) => {
    var iden = req.body.iden;
    let cargoSesion = "Instructor";
    try {
        let sql =
            "SELECT identificacion, Cargo,Nombres FROM `personas` WHERE identificacion=" +
            iden;
        conexion.query(sql, (err, rows, fields) => {
            return resp.json(rows);
        });
    } catch (error) {
        console.log("Error al Listar los Productos: " + error);
    }
};
controladorMovimiento.genVenta = async(req, resp) => {
    let pPersona = req.body.iden;
    let op1 = "NuevaVenta";
    let movimiento = 0;
    try {
        let sql = `CALL Administrar_Ventas('${op1}',${pPersona},'${movimiento}')`;
        conexion.query(sql, (err, rows) => {
            if (err) return console.log(err);
            return resp.json(rows[0]);
        });
    } catch (error) {}
};

controladorMovimiento.eliminarDetalle = async(req, resp) => {
    let idDetalle = req.body.idDetalle;
    try {
        let sql = `delete from detalle where id_detalle = '${idDetalle}'; `;
        conexion.query(sql, (err, rows) => {
            if (err) return console.log(err);
            return resp.json({ status: 200 });
        });
    } catch (error) {}
};

controladorMovimiento.agregarDetalle = async(req, resp) => {
    let cantidadProd = req.body.canProd;
    let valorProd = '';
    let estadoProd = "No Entregado";
    let comprador = req.body.comprador;
    let movimiento = req.body.movimiento;
    let sessionCaro = parseInt(req.body.codCargo);
    let inventario = req.body.id_inventario;
    if (!inventario || inventario == 'undefined') return console.log(inventario)
    try {

        let precios = `select id_inventario, aprendiz, instructor, administrativo, externo, auxiliar, stock from Lista_Productos where id_inventario='${inventario}'`
        conexion.query(precios, (err, rows_precio) => {
            let stock = rows_precio[0].stock;
            if (cantidadProd > stock) return resp.json({ titulo: "Adevertecia", icono: "error", mensaje: "Supera el limite del Stock.", timer: 1500 })
            if (err) return console.log(err);
            switch (sessionCaro) {
                case 1:
                    valorProd = rows_precio[0].aprendiz;
                    break;
                case 2:
                    valorProd = rows_precio[0].instructor;
                    break;
                case 3:
                    valorProd = rows_precio[0].administrativo;
                    break;
                case 4:
                    valorProd = rows_precio[0].externo;
                    break;
                case 5:
                    valorProd = rows_precio[0].auxiliar;
                    break;
                default:
                    break;
            }
            let sql = `insert into detalle(cantidad, valor, Estado, Persona, fk_Id_movimiento, fk_id_inventario)
                values(${cantidadProd},${valorProd}, '${estadoProd}', ${comprador},${movimiento}, ${inventario})`;
            conexion.query(sql, (err, rows) => {
                if (err) return console.log(err)
                return resp.json({
                    titulo: "Exito",
                    icono: "success",
                    mensaje: "Registro exitoso.",
                    timer: 1600
                });
            });
        });
        // conexion.query(sql, (err, rows) => {
        //     if (err) return console.log(err);
        //     return resp.json({ status: 200 });
        // });
    } catch (error) {}
};

controladorMovimiento.listarPreciosProductos = (req, resp) => {

    let sql = `select id_inventario as codigo, Producto, stock, aprendiz, instructor, administrativo,externo, auxiliar from Lista_Productos;`;
    conexion.query(sql, (err, rows) => {
        resp.json(rows);
    });
}

/* ================segunda parte==================== */
/* =====================lista los detalles de reserva================== */
controladorMovimiento.listarMovimientos = (req, resp) => {
        try {
            let sql = `select Id_movimiento,date_format(Fecha, "%d-%m-%Y") as Fecha ,
        Estado,(select Nombres from personas where movimientos.fk_persona=personas.identificacion)as personas,
        (select sum(valor * cantidad) from detalle where fk_Id_movimiento=movimientos.Id_movimiento) as total, 
        (SELECT COUNT(*) FROM detalle where movimientos.Id_movimiento = detalle.fk_Id_movimiento) as detalles
       from movimientos where estado='Reservado' or estado='Facturado' order by Id_movimiento desc;`;
            conexion.query(sql, (err, rows) => {
                resp.json(rows);
            });
        } catch (error) {
            console.log('Error al Listar los Movimientos: ' + error);
        }
    }
    /* ==============controlador de los detalles============================= */
controladorMovimiento.mostrarDetalle = (req, resp) => {
        var iden = req.params.idmovimiento;
        let sql = `select Codigo_pdto,id_detalle, Nombre, Cantidad, Nombres,identificacion,Persona, precio as VlrUnit, (Cantidad*precio) as VlrTotal, detalle.Estado as  EstadoVenta from productos 
    join precios on Codigo_pdto=fk_producto 
    join inventario on Codigo_pdto=fk_codigo_pdto 
    join detalle  on id_inventario=fk_id_inventario 
    JOIN personas on identificacion = Persona
    join movimientos 
    where Id_movimiento=fk_Id_movimiento and fk_Id_movimiento=` + iden + ` GROUP BY Id_detalle`;
        try {
            conexion.query(sql, (err, rows) => {
                resp.json(rows);
            });
        } catch (error) {
            console.log('Error al Listar  el Detalle: ' + error);

        }
    }
    /* =================boton editar==================== */
controladorMovimiento.botonModaleditar = (req, resp) => {
        var codigoProducto = req.body.Codigo_pdto;
        var sql = "SELECT id_detalle, nombre,codigo_pdto,cantidad,detalle.Estado as estadetalle FROM detalle JOIN inventario ON fk_id_inventario=id_inventario JOIN productos ON Codigo_pdto=fk_codigo_pdto where id_detalle=" + codigoProducto;
        conexion.query(sql, (err, rows) => {
            resp.json(rows[0]);

        });
    }
    /*===============editar================*/
controladorMovimiento.editar = (req, resp) => {
        var idDetalle = req.body.codigo_pdto;
        var cantidad = req.body.cantidad;
        var estado = req.body.estado;
        try {
            var sql = `UPDATE detalle SET cantidad =${cantidad},Estado='${estado}' WHERE detalle.id_detalle=` + idDetalle;
            conexion.query(sql, (err, rows) => {
                resp.json(rows);

            });

        } catch {
            console.log(error)
        }
    }
    /* ===============lista los productos==================== */
    /* controladorMovimiento.listarProductos = (req, resp) => {
        try {
            let sql = `select Codigo_pdto, productos.Nombre as NombreProd,Precio , unidades_productivas.Nombre as UProd from productos join unidades_productivas on codigo_up=fk_codigo_up join precios on Codigo_pdto=fk_producto;`;
            conexion.query(sql, (err, rows) => {
                resp.json(rows);
            });
        } catch (error) {
            console.log('Error al Listar los Productos: ' + error);

        }
    } */
    /* ===============finalizar compra ==================================== */
controladorMovimiento.endCompra = (req, resp) => {
    var IDdetalle = req.body.IDdetalle;
    if (!IDdetalle || IDdetalle == 'undefined') return resp.json({ status: 'error', message: 'Coloca tu  ID' })
    var sql = `call Administrar_Ventas('Facturar',0,${IDdetalle})`;
    conexion.query(sql, (err, rows) => {
        resp.json(rows);
    });
}

module.exports = controladorMovimiento;