let express = require('express');
let routeEst = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let contEstadistica = require('../controllers/controller.estadisticas');

routeEst.get('/reportes', contEstadistica.reportegeneral);
routeEst.get('/reporteUnidadesProductivas', contEstadistica.reporteunidades)
routeEst.get('/reportepuntoventa', contEstadistica.reportepuntoventa);

module.exports = routeEst;