let express = require('express');
let routeReportes = express.Router();
let controllerReportes = require('../controllers/controller.reportes')

routeReportes.get('/', (req, res) => { res.render('admin/reportes') })

module.exports = routeReportes;