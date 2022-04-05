const conexion = require('../database/conexion.js');
const storage = require('node-sessionstorage');
const authConfig = require('../config/auth')
let jwt = require('jsonwebtoken');
let controllerAuth = {}

controllerAuth.signUp = (req, res) => {},
    controllerAuth.logIn = (req, res) => {
        let credentials = {
            user: 'Alejandro',
            password: '123456'
        }
        if (req.body.user != credentials.user || req.body.password != credentials.password) {
            return res.json({
                status: 'error',
                result: { msg: 'User or password incorrect' }
            })
        }
        let json = {
            id: 1116912148,
            role: 'Administrativo'
        }
        let token = jwt.sign({ user: json }, authConfig.secret, { expiresIn: authConfig.expires })
        var decoded = jwt.verify(token, authConfig.secret);
        storage.setItem('token', token)
        return res.json({ user: decoded.user, token })
    }
controllerAuth.logOut = (req, res) => {
    return storage.removeItem('token');
}
controllerAuth.profile = (req, res) => {
    let token = req.body.token;
    let decoded = jwt.verify(token, authConfig.secret);
    var sql = `select identificacion, Nombres, Correo, Cargo from personas WHERE identificacion = '${decoded.user.id}'`;
    conexion.query(sql, (err, rows) => {
        if (err) return res.json({ status: 'error', message: 'Error with sql query' })
        if (rows.length <= 0) return res.json({ status: 'error', message: 'Unauthorized' })
        return res.json({ user: rows[0] })
    });
}

module.exports = controllerAuth;