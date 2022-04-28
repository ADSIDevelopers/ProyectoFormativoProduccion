let express = require('express');
let routeReportesUp = express.Router();
let controllerReportesUp = require('../controllers/controller.reporUp')

routeReportesUp.get('/reporteUp', controllerReportesUp.reporteunidades);
module.exports = routeReportesUp;