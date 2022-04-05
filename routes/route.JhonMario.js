let express = require('express');
const { route } = require('express/lib/application');
let routeRegistroCliente = express.Router();
let contIndex = require('../controllers/controller.jhonMario');

routeRegistroCliente.get('/registroClientes', contIndex.registroclientes);

module.exports = routeRegistroCliente;