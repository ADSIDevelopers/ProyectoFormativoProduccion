let express = require('express');
let routeMovimientos = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let contMovimientos = require('../controllers/controller.movimientos');

routeMovimientos.get('/movimientos', contMovimientos.renderMovimientos);
routeMovimientos.get('/listarMovimientos', contMovimientos.listarMovimientos);
routeMovimientos.get('/addProd', contMovimientos.listarProductos);
routeMovimientos.post('/consAddProd', contMovimientos.consAggProd);
routeMovimientos.post('/filtro', contMovimientos.filtro);
routeMovimientos.post('/genventa', contMovimientos.genVenta);
routeMovimientos.post('/agregarDetalle', contMovimientos.agregarDetalle);
routeMovimientos.post('/eliminarDetalle', contMovimientos.eliminarDetalle);
routeMovimientos.get('/listarPrecioProductos', contMovimientos.listarPreciosProductos);


routeMovimientos.get('/listarDetalle/:idmovimiento', contMovimientos.mostrarDetalle);
routeMovimientos.get('/factura/:idmovimiento',contMovimientos.mostrarDetalle);
routeMovimientos.post('/botoneditar',contMovimientos.botonModaleditar);
routeMovimientos.post('/editar',contMovimientos.editar);
routeMovimientos.post('/endCompra',contMovimientos.endCompra);

module.exports = routeMovimientos;