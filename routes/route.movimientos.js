let express = require('express');
let routeMovimientos = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let contMovimientos = require('../controllers/controller.movimientos');

routeMovimientos.get('/movimientos', contMovimientos.renderMovimientos);
routeMovimientos.get('/listarMovimientos', contMovimientos.listarMovimientos);
routeMovimientos.post('/listarDetalle', contMovimientos.mostrarDetalle);
routeMovimientos.get('/addProd', contMovimientos.listarProductos);
routeMovimientos.post('/consAddProd', contMovimientos.consAggProd);
routeMovimientos.post('/filtro', contMovimientos.filtro);
routeMovimientos.post('/facturarmov', contMovimientos.facturarNuevaVenta);

module.exports = routeMovimientos;