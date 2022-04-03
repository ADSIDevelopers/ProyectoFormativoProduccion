let express = require('express');
let routeIndex = express.Router();
let contIndex = require('../controllers/controller.index');

routeIndex.get('/', contIndex.renderIndex);
routeIndex.get('/admin', contIndex.adminIndex);
routeIndex.get('/adminProduccion', contIndex.adminProduccion);
routeIndex.get('/usuarios', contIndex.usuarios);
routeIndex.get('/store', contIndex.store);
routeIndex.get('/buy', contIndex.buy);
routeIndex.get('/uds', contIndex.uds);
routeIndex.get('/ud', contIndex.ud);

module.exports = routeIndex;