let express = require('express');
let routeVenta = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let contVenta = require('../controllers/controller.venta');

routeVenta.get('/venta', contVenta.renderVenta);
routeVenta.get('/listarVentas', contVenta.listarVentas);

module.exports = routeVenta;