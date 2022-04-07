const express = require('express');
const ruta_puntoventa = express.Router();
const controlador_puntoventa = require("../controllers/controller.puntoventa");

ruta_puntoventa.get("/Puntoventa",controlador_puntoventa.Vista);

module.exports = ruta_puntoventa;