let express = require('express');
let routeRep_Pvent = express.Router();
let controllerRepoP_Vent = require('../controllers/controller.reporPv')

routeRep_Pvent.get('/Reporte_Pvent', controllerRepoP_Vent.reportepuntoventa);
routeRep_Pvent.get('/Reporte_Cant_Pv',controllerRepoP_Vent.reporteCantidad)
module.exports = routeRep_Pvent;