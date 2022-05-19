let express = require('express');
let route = express.Router();

let controller = require('../controllers/controller.clientes');
/* ===MIDDLEWARE */
let auth = require('../middlewares/middleware.auth');

route.get('/RegistroClientes', auth.authToken, controller.renderRegistroCliente);
route.get('/Listar_Usuarios', controller.Listar_Usuarios);
route.post('/registro', controller.RegistroCliente);
route.post('/buscar', controller.buscar );
route.post('/actualizar', controller.actualizar);
module.exports = route;