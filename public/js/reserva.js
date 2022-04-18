function MostrarPdto(){
    var sql= "select Nombre * from productos";
    conexion.query(sql,(err,rows)=>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log('Error al listar '+ err)
        }
    });
}

window.onload = function(){
    var fecha = new Date();
    var mes = fecha.getMonth()+1; 
    var dia = fecha.getDate();
    var anio = fecha.getFullYear();
    if(dia<10)
        dia='0'+dia;
    if(mes<10)
        mes='0'+mes
        document.getElementById("date").innerHTML = dia + "/" + mes + "/" + anio;
}
var Precio = 10000;
function Aumentar(){
    let espacio = parseInt(document.getElementById('Valor').innerHTML);
    let suma = espacio + 1;
    if(suma <= 9){
        document.getElementById('Valor').innerHTML = suma;
        let unidad = (Precio*suma);
        let Subtotal = new Intl.NumberFormat('es-ES').format(unidad);
        document.getElementById('total').innerHTML = "$ " + Subtotal;
        document.getElementById('cantidad').innerHTML = suma;
    }
}
function Disminuir(){
    let espacio = parseInt(document.getElementById('Valor').innerHTML);
    let resta = espacio - 1;
    if(resta >= 0){
        document.getElementById('Valor').innerHTML = resta;
        let unidad = (Precio*resta);
        let Subtotal = new Intl.NumberFormat('es-ES').format(unidad);
        document.getElementById('total').innerHTML ="$ " + Subtotal;
        document.getElementById('cantidad').innerHTML = resta;
    }
}
