const conexion = require('../database/conexion.js');
const storage = require('node-sessionstorage');
const authConfig = require('../config/auth')
let jwt = require('jsonwebtoken');
let controllerAuth = {}

controllerAuth.logIn = (req, res) => {
    var sql =`select identificacion, Rol from personas WHERE Login = '${req.body.user}' and password = '${req.body.password}'`;
    conexion.query(sql,(err,rows)=>{
        if(err) return res.json({status: 'error', message: 'Error with sql query'})
        if(rows.length <= 0) return res.json({status: 'error', message: 'User not found'})
        let json = {
            id: rows[0].identificacion,
            role: rows[0].Rol,
        }
        let token = jwt.sign({user: json}, authConfig.secret, {expiresIn: authConfig.expires})
        var decoded = jwt.verify(token, authConfig.secret);
        storage.setItem('token', token)
        return res.json({user:decoded.user, token})
    });
    
    
}
controllerAuth.logOut = (req, res) => {
    return storage.removeItem('token');
} 
controllerAuth.profile = (req, res) => {
    let token = storage.getItem('token');
    let decoded = jwt.verify(token, authConfig.secret);
    try{
        var sql =`select identificacion, Nombres, Correo, cargo.nombre_cargo as Cargo from personas join cargo on Cargo = idcargo WHERE identificacion = '${decoded.user.id}'`;
        conexion.query(sql,(err,rows)=>{
            if(err) return res.json({status: 'error', message: 'Error with sql query'})
            if(rows.length <= 0) return res.json({status: 'error', message: 'Unauthorized'})
            return res.json({user: rows[0]})
        });
    } catch(err){
        console.log(err);
    }
}
controllerAuth.changePassword = (req, res) => {
    let token = storage.getItem('token');
    let decoded = jwt.verify(token, authConfig.secret);
    let actual_password = req.body.actual_password;
    let new_password = req.body.new_password;
    if(!new_password) return res.json({status: 'error', message: 'New password cannot be empty'})
    var sql =`select password from personas WHERE identificacion = '${decoded.user.id}'`;
    try{
        conexion.query(sql,(err,rows)=>{
            if(err) return res.json({status: 'error', message: 'Error with sql query'});
            if(actual_password != rows[0].password) return res.json({status: 'error', message: "La contraseña actual no coincide"})
            var sql_update =`update personas set password = '${new_password}' WHERE identificacion = '${decoded.user.id}'`;
            //=========UPDATE PASSWORD============== 
            conexion.query(sql_update,(err,rows)=>{
                if(err) return res.json({status: 'error', message: 'Error with update sql query'});
                return res.json({status: 'success', message: 'Contraseña editada con éxito'})
            });
        });
    } catch (err) {
        return res.json({status: 'error', message: err.message});
    }
}

module.exports = controllerAuth;