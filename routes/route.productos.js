const express = require('express');
const ruta_productos = express.Router();
const controlador_productos = require("../controllers/controller.productos");

ruta_productos.get("/Productos",controlador_productos.Vista);

module.exports = ruta_productos;