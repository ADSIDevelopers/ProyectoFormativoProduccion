let express = require('express');
const { route } = require('express/lib/application');
let routeIndex = express.Router();
let contIndex = require('../controllers/controller.index');




routeIndex.get('/', contIndex.renderIndex);
routeIndex.get('/adminIndex', contIndex.adminIndex);
routeIndex.get('/adminProduccion', contIndex.adminProduccion);
routeIndex.get('/usuarios', contIndex.usuarios);
routeIndex.get('/store', contIndex.store);
routeIndex.get('/buy', contIndex.buy);
routeIndex.get('/uds', contIndex.uds);
routeIndex.get('/ud', contIndex.ud);
routeIndex.get('/auth', contIndex.autenticar);
routeIndex.get('/UnidadesProductivas', contIndex.unidadesproductivas);
routeIndex.get('/inventario',contIndex.inventario);
routeIndex.get('/productos',contIndex.productos);
routeIndex.get('/puntoventa',contIndex.puntoventa);
module.exports = routeIndex;