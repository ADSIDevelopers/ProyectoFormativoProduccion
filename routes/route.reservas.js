const express = require('express');
const ruta_reserva = express.Router();
const cont_reserva = require("../controllers/controller.reservas");

ruta_reserva.get("/ListarProductos",cont_reserva.Listar_Productos);

ruta_reserva.post("/Buscar_Producto",cont_reserva.Buscar_Producto);


ruta_reserva.get("/Listar_Reservas_Pendientes",cont_reserva.Listar_Reservas_Pendientes);

ruta_reserva.post("/Listar_Usuaios_Ficha", cont_reserva.Listar_Usuaios_Ficha);
ruta_reserva.post("/Registrar_Detalle", cont_reserva.Registrar_Detalle);
ruta_reserva.post("/Eliminar_Detalle", cont_reserva.Eliminar_Detalle);




module.exports = ruta_reserva;