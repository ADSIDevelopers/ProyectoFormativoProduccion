const express = require('express');
const ruta_inventario = express.Router();
const controlador_inventario = require("../controllers/controller.inventario");

ruta_inventario.get("/inventario",controlador_inventario.Vista);
ruta_inventario.post("/Registrar_inventario",controlador_inventario.registrarInventario);
ruta_inventario.get("/Lista_Inventario",controlador_inventario.ListaInventario);
ruta_inventario.post("/Buscar_Invent",controlador_inventario.BuscarInvent);
ruta_inventario.post("/Actualizar_Invent",controlador_inventario.ActualformInvent);

module.exports = ruta_inventario;