const conexion = require('../database/conexion.js');
const storage = require('node-sessionstorage');
const authConfig = require('../config/auth')
let jwt = require('jsonwebtoken');
module.exports = {
    async onlyAdmin(req, res, next) {
        if(req.session.Rol.trim() != 'Admin') return res.redirect('/');
        next();
    },
}