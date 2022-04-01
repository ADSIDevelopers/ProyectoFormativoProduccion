const express = require('express');
const ruta_index = express.Router();
const cont_index = require("../controllers/controller.produccionUp");


ruta_index.get("/produccionUp",cont_index.renderizarFrmProduccionUp);


module.exports = ruta_index;