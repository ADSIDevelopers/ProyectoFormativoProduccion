let express = require('express');
let routeEStadisticas = express.Router();
let controllerEstadisticas = require('../controllers/controller_estadisticas')

routeEStadisticas.get('/Estadisticas', controllerEstadisticas.renderEstadisticas);

module.exports = routeEStadisticas;