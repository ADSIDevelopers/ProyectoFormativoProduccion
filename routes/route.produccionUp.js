const express = require('express');
const ruta_index = express.Router();
const cont_index = require("../controllers/controller.produccionUp");

ruta_index.get('/produccion',cont_index.Produccion);
ruta_index.post('/formR',cont_index.RegistrarProduccion);
ruta_index.post("/Listar_Produccion", cont_index.Listar_Produccion);

module.exports = ruta_index;