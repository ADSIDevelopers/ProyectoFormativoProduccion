let express = require('express');
let routeIndex = express.Router();
let contIndex = require('../controllers/controller.index');




routeIndex.get('/', contIndex.renderIndex);
routeIndex.get('/usuarios', contIndex.usuarios);
routeIndex.get('/store', contIndex.store);
routeIndex.get('/buy', contIndex.buy);
routeIndex.get('/uds', contIndex.uds);
routeIndex.get('/ud', contIndex.ud);
routeIndex.get('/auth', contIndex.autenticar);

module.exports = routeIndex;