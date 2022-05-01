const express = require('express');
const { CargarImagen } = require('../controllers/controller.productos');
const ruta_productos = express.Router();
const controlador_productos = require("../controllers/controller.productos");

ruta_productos.get("/Productos",controlador_productos.Vista);
ruta_productos.post("/Registrar_pdto",controlador_productos.CargarImagen,controlador_productos.RegistrarProductos);
ruta_productos.get("/Lista_pdto",controlador_productos.ListaProductos);
ruta_productos.post("/Buscar_pdto",controlador_productos.buscarpdto);
ruta_productos.post("/Actual_pdto",controlador_productos.CargarImagen,controlador_productos.Actualizarproductos);
ruta_productos.post("/Listar_precios",controlador_productos.ListarPrecios);
ruta_productos.post("/Registrar_precio",controlador_productos.RegistrarPrecios);
ruta_productos.post("/buscar_sale",controlador_productos.BuscarPrecio);
ruta_productos.post("/Mostrar_sale",controlador_productos.Mostrarprecio);
ruta_productos.post("/Actualizar_precios",controlador_productos.ActualizarSale);


module.exports = ruta_productos;