let mysql = require('mysql');
const pool = mysql.createPool({
    host: 'bsmwpxrcyzptfha22nhe-mysql.services.clever-cloud.com',
    user: 'uxbb2m9uqgkcgbys',
    password: 'rygMdhJgbwHBhjcDDotQ',
    database: 'bsmwpxrcyzptfha22nhe'
})
let query = function(sql, values){
    return new Promise((resolve, reject)=>{
        pool.getConnection(function(error, conexion){
            if(error){
                reject(error)
            }
            else{
                conexion.query(sql, values, (error, rows)=>{
                    if(error){
                        reject(error)
                    }
                    else{
                        resolve(rows)
                    }
                    conexion.release();
                })
            }
        })
    })
}
module.exports = query;