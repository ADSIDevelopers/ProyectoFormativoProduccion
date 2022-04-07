const express = require('express');
const { CargarImagen } = require('../controllers/controller.unidadesproductivas');
const ruta_unidadesprodcutivas = express.Router();
const controlador_unidadesprodcutivas = require("../controllers/controller.unidadesproductivas");

ruta_unidadesprodcutivas.get("/UnidadesProductivas",controlador_unidadesprodcutivas.Vista);


module.exports = ruta_unidadesprodcutivas;