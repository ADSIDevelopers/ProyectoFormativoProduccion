const express = require('express');
const route = express.Router();
const auth = require('../middlewares/middleware.auth');
const contIndex = require('../controllers/controller.views');
const cont_reserva = require("../controllers/controller.reservas");


route.get('/', contIndex.renderIndex);
route.get('/admin', /* auth.authRoute, */ contIndex.adminIndex);
route.get('/perfil', /* auth.authRoute, */ contIndex.perfil);

route.get("/ListarProductos", auth.authRoute, cont_reserva.Listar_Productos);

module.exports = route;