let express = require('express');
let routeJhonMario = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let controllerJhonMario = require('../controllers/controllerClientes');
let verifyRoute = require('../middlewares/middleware.route');


routeJhonMario.get('/RegistroClientes', authMiddleware.authToken, verifyRoute.onlyAdmin, controllerJhonMario.renderRegistroCliente);
routeJhonMario.get('/Listar_Usuarios', controllerJhonMario.Listar_Usuarios);
routeJhonMario.post('/registro', controllerJhonMario.RegistroCliente);
routeJhonMario.post('/buscar', controllerJhonMario.buscar );
routeJhonMario.post('/actualizar', controllerJhonMario.actualizar);
module.exports = routeJhonMario;