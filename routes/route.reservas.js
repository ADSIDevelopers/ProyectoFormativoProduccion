const express = require('express');
const ruta_index = express.Router();
const cont_index = require("../controllers/controller.reservas");


ruta_index.get("/reservas", cont_index.renderizarFrmReservas);


module.exports = ruta_index;