let express = require('express');
let routeAuth = express.Router();
let controllerAuth = require('../controllers/controller.auth')

routeAuth.post('/login', controllerAuth.logIn);
routeAuth.post('/logout', controllerAuth.logOut);

module.exports = routeAuth;