const express = require('express');
const ruta_inventario = express.Router();
const controlador_inventario = require("../controllers/controller.inventario");

ruta_inventario.get("/inventario",controlador_inventario.Vista);
ruta_inventario.get("/Registrar_inventario",controlador_inventario.AbrirformularioInventario);
ruta_inventario.get("/Lista_Inventario",controlador_inventario.ListaInventario);

module.exports = ruta_inventario;