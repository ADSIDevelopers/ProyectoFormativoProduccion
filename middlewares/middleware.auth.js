const conexion = require('../database/conexion.js');
const storage = require('node-sessionstorage');
const authConfig = require('../config/auth')
let jwt = require('jsonwebtoken');
module.exports = {
    async authToken(req, res, next) {
        let token = storage.getItem('token');
        if(!token) return res.redirect('/');
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) return res.redirect('/')
            var sql =`select identificacion, Nombres, Correo, Cargo from personas WHERE identificacion = '${decoded.user.id}'`;
            try{
                conexion.query(sql,(conError,rows)=>{
                    if(conError) return res.redirect('/')
                    if(rows.length <= 0) return res.redirect('/')
                    req.session = rows[0];
                    next();
                });
            } catch(e) {
                return res.redirect('/')
            }
                
        })
    }
}