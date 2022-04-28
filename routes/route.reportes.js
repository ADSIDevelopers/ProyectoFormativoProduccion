let express = require('express');
let routeReportes = express.Router();
let controllerReportes = require('../controllers/controller.reportes')

routeReportes.get('/reporadmin', controllerReportes.reporteAdmin);
routeReportes.get('/reporVent',controllerReportes.reporteVent)
routeReportes.get('/reporCant',controllerReportes.reporteCant);
routeReportes.get('/reporDPV', controllerReportes.reporteDvp);
routeReportes.get('/reporProduccion',controllerReportes.reporteProduccion)
routeReportes.get('/reporVal',controllerReportes.reporteval);

module.exports = routeReportes;