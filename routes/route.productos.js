const express = require('express');
const { CargarImagen } = require('../controllers/controller.productos');
const ruta_productos = express.Router();
const controlador_productos = require("../controllers/controller.productos");

ruta_productos.get("/Productos",controlador_productos.Vista);
ruta_productos.post("/Registrar_pdto",controlador_productos.CargarImagen,controlador_productos.RegistrarProductos);
ruta_productos.get("/Lista_pdto",controlador_productos.ListaProductos);

module.exports = ruta_productos;