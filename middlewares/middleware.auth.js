const conexion = require('../database/conexion.js');
const query = require('../database/pool-conexion');
const storage = require('node-sessionstorage');
const authConfig = require('../config/auth')
let jwt = require('jsonwebtoken');
module.exports = {
    async authToken(req, res, next) {
        if(!req.headers.authorization) {
            return res.json({status: 401, msg: 'Not authorized'});
        }else{
            let token = req.headers.authorization.split(' ')[1];
            if(!token) return res.json({status: 401, message: "Token is required"})
            try{
                jwt.verify(token, authConfig.secret, (err, decoded) => {
                    if(err) return res.json({status: 401, message: 'Not authorized'}); 
                    var sql =`select identificacion, Nombres, Correo, Rol, cargo.nombre_cargo as Cargo,Cargo as id_cargo, Ficha 
                    from personas join cargo on Cargo = idcargo WHERE identificacion = '${decoded.user.id}'`;
                    conexion.query(sql,(conError,rows)=>{
                        if(conError) return res.json({status: 401, message: 'Error'})
                        if(rows.length <= 0) return res.json({status: 401, message:'No authorized'})
                        req.session = rows[0];
                        next();
                    });
                })
            } catch(e){
                console.log(e);
            }
        }
    },
    async authRoute(req, res, next) {
        let token = storage.getItem('token');
        if(!token) return res.redirect('/');
        try{
            jwt.verify(token, authConfig.secret, async (err, decoded) => {
                if(err) return res.redirect('/')
                var sql = `select identificacion, Nombres, Correo, Rol, cargo.nombre_cargo as Cargo,Cargo as id_cargo, Ficha 
                from personas join cargo on Cargo = idcargo WHERE identificacion = '${decoded.user.id}'`;
                let user = await query(sql);
                if(user.length <= 0) return res.redirect('/')
                req.session = user[0];
                next();                    
            })
        } catch(e){
            return res.redirect('/')
        }
    },
}