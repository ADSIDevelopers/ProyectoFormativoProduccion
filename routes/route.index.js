let express = require('express');
let routeIndex = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let verifyRoute = require('../middlewares/middleware.route');
let contIndex = require('../controllers/controller.index');

routeIndex.get('/', contIndex.renderIndex);
routeIndex.get('/admin', /* authMiddleware.authToken, */ contIndex.adminIndex);
routeIndex.get('/perfil', authMiddleware.authToken, verifyRoute.onlyAdmin,  contIndex.perfil)

module.exports = routeIndex;