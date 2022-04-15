let express = require('express');
let routeJhonMario = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let controllerJhonMario = require('../controllers/controllerJhonMario');


routeJhonMario.get('/RegistroClientes', controllerJhonMario.renderRegistroCliente);

module.exports = routeJhonMario;