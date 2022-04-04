const express = require('express');
const { CargarImagen } = require('../controllers/controller.unidadesproductivas');
const ruta_unidadesprodcutivas = express.Router();
const controlador_unidadesprodcutivas = require("../controllers/controller.unidadesproductivas");

ruta_unidadesprodcutivas.get("/UnidadesProductivas",controlador_unidadesprodcutivas.Vista)
ruta_unidadesprodcutivas.get("/Registrar_Unidades",controlador_unidadesprodcutivas.AbrirformularioUnidadesProductivas);
ruta_unidadesprodcutivas.post("/Registrar_Unidades",controlador_unidadesprodcutivas.CargarImagen, controlador_unidadesprodcutivas.RegistrarUnidadProductiva);
ruta_unidadesprodcutivas.get("/Lista_Unidadesproductivas",controlador_unidadesprodcutivas.ListaUnidadesProductivas);
ruta_unidadesprodcutivas.get("/Eliminar_unidad/:id",controlador_unidadesprodcutivas.EliminarUnidadProductiva);
module.exports = ruta_unidadesprodcutivas;