const express = require('express');
const ruta_inventario = express.Router();
const controlador_inventario = require("../controllers/controller.inventario");

ruta_inventario.get("/inventario",controlador_inventario.Vista);

module.exports = ruta_inventario;