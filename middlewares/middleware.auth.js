const storage = require('node-sessionstorage');
const authConfig = require('../config/auth')
let jwt = require('jsonwebtoken');
module.exports = {
    async authToken(req, res, next) {
        let token = storage.getItem('token');
        if(!token) return res.redirect('/');
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) return res.redirect('/');
            else next();
        })
    }
}