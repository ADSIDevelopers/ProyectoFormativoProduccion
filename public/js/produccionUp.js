window.onload = Listar_Produccion();

var myModal = new bootstrap.Modal(document.getElementById('myModal'), 
{
keyboard: false});

function Abrir_Frm_Produccion(){
    myModal.show();
}
function Frm_Produccion(){
    fetch('/FrmProduccion',
    {method:'get',
    });
}

function Listar_Produccion(){
    fetch('/Listar_Produccion',
    {method:'post',
    })
    .then(res=>res.json())
    .then(data=>{
        var tabla='';
        for(var i=0; i<data.length;i++){
            tabla += '<tr><td>'+data[i].Id_produccion+'</td>';
            tabla += '<td>'+data[i].Cantidad+'</td>';
            tabla += '<td>'+data[i].fecha+'</td>';
            tabla += '<td>'+data[i].Observacion+'</td>';
            tabla += '<td>'+data[i].Nombre+'</td>';
            tabla += '</tr>';
        }
        $('#tablaProducccion').DataTable().destroy();
        document.getElementById('tabla').innerHTML=tabla;
        $('#tablaProducccion').DataTable({
            destroy: true,
            processing : true
        });
    });
}
function BuscaProducto(namePdto,id){

    var datos = new URLSearchParams();
    datos.append('Codigo',namePdto);

    fetch('/BuscaProducto',
    {method:'post',
    body: datos
    })
    .then(res=>res.json())
    .then(data=>{
        data.forEach(pdto => {            
        document.getElementById('namePdto').value=pdto.Nombre;
    });
    Abrir_Frm_Produccion(namePdto, id);
    });
}
function RegistrarProduccion() {
    /* =================fecha local============= */

    var fecha = new Date();
    var mes = fecha.getMonth()+1; 
    var dia = fecha.getDate();
    var anio = fecha.getFullYear();
    if(dia<10)
        dia='0'+dia;
    if(mes<10)
        mes='0'+mes

    let form = document.getElementById('form-produccion');
    var cant=document.getElementById('cantidad').value;
    var obser=document.getElementById('observacion').value;
    var fkpdto = document.getElementById('pdto').value;
    var fechas = fecha + anio;
    if(cant == 0){
        alert('Por favor ingrese una cantidad')
    }
    else{

    var datos= new URLSearchParams();
    
    datos.append('Cantidad',cant);
    datos.append('Observacion',obser);
    datos.append('fkp',fkpdto)
    datos.append('fecha',fechas)
    console.log(datos);

    fetch('/formR',
    {method:'post',
    body: datos
    }
    ).then(res=>res.json())
    .then(data=>{
        myModal.hide();
         Swal.fire({
                    title: data.titulo,
                    icon: data.icono,
                    text: data.mensaje,
                    showConfirmButton: false,
                    timer: 1000
        })
        
    });
    form.reset();
    Listar_Produccion();
}
}
