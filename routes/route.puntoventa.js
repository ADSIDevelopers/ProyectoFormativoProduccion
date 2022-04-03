const express = require('express');
const ruta_puntoventa = express.Router();
const controlador_puntoventa = require("../controllers/controller.puntoventa");

ruta_puntoventa.get("/Puntoventa",controlador_puntoventa.Vista);
ruta_puntoventa.get("/Registrar_puntoventa",controlador_puntoventa.AbrirformularioPuntoventa);
ruta_puntoventa.get("/Lista_puntoventa",controlador_puntoventa.ListaPuntoventa);

module.exports = ruta_puntoventa;