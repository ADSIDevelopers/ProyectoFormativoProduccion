const express = require('express');
const ruta_inventario = express.Router();
const controlador_inventario = require("../controllers/controller.inventario");

ruta_inventario.get("/inventario",controlador_inventario.Vista);
ruta_inventario.post("/Registrar_inventario",controlador_inventario.registrarInventario);
ruta_inventario.get("/Lista_Inventario",controlador_inventario.ListaInventario);
ruta_inventario.post("/Buscar_Invent",controlador_inventario.BuscarInvent);
ruta_inventario.post("/Lista_produccion",controlador_inventario.ListaProduccion);
ruta_inventario.post("/idpdto_inventario",controlador_inventario.pdtoinventario);
ruta_inventario.post("/Lista_Bodega",controlador_inventario.ListarBodega);
ruta_inventario.post("/idpuntovent",controlador_inventario.Nombrepunt);
ruta_inventario.post("/llamarproduccion",controlador_inventario.valoresproduccion);
ruta_inventario.post("/Actualizarinvent",controlador_inventario.Actualizarinventario);

module.exports = ruta_inventario;