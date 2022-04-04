const express = require('express');
const ruta_productos = express.Router();
const controlador_productos = require("../controllers/controller.productos");

ruta_productos.get("/Productos",controlador_productos.Vista);
ruta_productos.get("/Registrar_productos",controlador_productos.AbrirformularioProductos);
ruta_productos.get("/Lista_productos",controlador_productos.ListaProductos);

module.exports = ruta_productos;