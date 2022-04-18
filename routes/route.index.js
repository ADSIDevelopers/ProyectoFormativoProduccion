let express = require('express');
let routeIndex = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let contIndex = require('../controllers/controller.index');

routeIndex.get('/', contIndex.renderIndex);
routeIndex.get('/admin', /* authMiddleware.authToken, */ contIndex.adminIndex);
routeIndex.get('/perfil', /* authMiddleware.authToken, */ contIndex.perfil)
routeIndex.get('/adminProduccion', contIndex.adminProduccion);
routeIndex.get('/usuarios', contIndex.usuarios);
routeIndex.get('/store', contIndex.store);
routeIndex.get('/buy', contIndex.buy);
routeIndex.get('/uds', contIndex.uds);
routeIndex.get('/ud', contIndex.ud);



module.exports = routeIndex;