const express = require('express');
const ruta_puntoventa = express.Router();
const controlador_puntoventa = require("../controllers/controller.puntoventa");

ruta_puntoventa.get("/Puntoventa",controlador_puntoventa.Vista);
ruta_puntoventa.post("/Registrar_PuntoVenta",controlador_puntoventa.RegistrarPunto);
ruta_puntoventa.get("/Lista_PuntoVenta", controlador_puntoventa.ListaPuntoventa);
ruta_puntoventa.post("/Buscar_punvnt",controlador_puntoventa.Buscarpuntv);
ruta_puntoventa.post("/Actualizar_PuntoVenta",controlador_puntoventa.Actualformpuntv);

module.exports = ruta_puntoventa;