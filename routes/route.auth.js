let express = require('express');
let routeAuth = express.Router();
let authMiddleware = require('../middlewares/middleware.auth');
let controllerAuth = require('../controllers/controller.auth')

routeAuth.post('/login', controllerAuth.logIn);
routeAuth.post('/logout', controllerAuth.logOut);
routeAuth.post('/change-password', authMiddleware.authToken, controllerAuth.changePassword)

module.exports = routeAuth;