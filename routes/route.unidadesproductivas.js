const express = require('express');
const { CargarImagen } = require('../controllers/controller.unidadesproductivas');
const ruta_unidadesprodcutivas = express.Router();
const controlador_unidadesprodcutivas = require("../controllers/controller.unidadesproductivas");

ruta_unidadesprodcutivas.get("/UnidadesProductivas",controlador_unidadesprodcutivas.Vista);
ruta_unidadesprodcutivas.post("/RegistrarUnidadProductiva",controlador_unidadesprodcutivas.CargarImagen,controlador_unidadesprodcutivas.RegistrarUnidadProductiva);
ruta_unidadesprodcutivas.get("/Lista_unidadesproductivas",controlador_unidadesprodcutivas.ListaUnidadesProductivas);
ruta_unidadesprodcutivas.post("/Buscar_UP",controlador_unidadesprodcutivas.Buscarunidadproductiva);
ruta_unidadesprodcutivas.post("/Actualizar_up",controlador_unidadesprodcutivas.CargarImagen,controlador_unidadesprodcutivas.ActualizarUnidadProductiva)

module.exports = ruta_unidadesprodcutivas;