let express = require('express');
let routeReportes = express.Router();
let controllerReportes = require('../controllers/controller.reportes')

routeReportes.get('/reportes', controllerReportes.listarReportes);

module.exports = routeReportes;