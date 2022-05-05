var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
    });
var modalbodega = new bootstrap.Modal(document.getElementById('mysmodalbodega'), {
        keyboard: false
    });
/* =================================================== */
function RegistrarInventario() {
    let sotckinventario = 0;
    let productos = document.getElementById('fkproducto').value;
    let puntoventa= document.getElementById('fkpuntventa').value;
    
    var datos= new URLSearchParams();
    datos.append('stock',sotckinventario);
    datos.append('pdto',productos);
    datos.append('Pventa',puntoventa);
  
    fetch('/Registrar_inventario',
    {
        method:'post',
        body:datos
    }).then(res=>res.json())
    .then(data=>{
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje,
            timer: 1500
            })
            ListarInventario();
    });
}
/* ==================================================== */
window.onload = ListarInventario();
function ListarInventario(){
    fetch('/Lista_Inventario',
        {method:'get'
        })
        .then(res=>res.json())
        .then(data=>{
            let json = [];
            let array = {}
            data.forEach(element => {
                array = {
                    "col-1": element.id_inventario,
                    "col-2": element.nombrePunto,
                    "col-3": element.nombrePdto,
                    "col-4": element.stock,
                    "col-5": `<a class='btn-edit' onclick='Mostrarventana("`+element.Codigo_pdto+`","`+element.id_inventario+`")';>Editar</a>`,
                }
                json.push(array);
            });
            $('#tabla-inventario').DataTable({
                "autoWidth": false,
                "info" : false,
                "destroy": true,
                data: json,
                columns : [
                    {"data": "col-1"},
                    {"data": "col-2"},
                    {"data": "col-3"},
                    {"data": "col-4"},
                    {"data": "col-5"}
                ]
            })
        })
}
/* ========================================================================== */
function Mostrarinvt(idinvt){
    let idinventario = document.getElementById('id_invetario').value;
    var datos = new URLSearchParams();
    datos.append('idinve',idinventario);
    datos.append('idpunto',idinvt);
    fetch('/idpuntovent',
    {   method:'post',
        body:datos
    }).then(res=>res.json())
    .then(data=>{
        data.forEach(invent => {
            document.getElementById('id_invetario').value=invent.id_inventario;
            document.getElementById('Productoact').value=invent.nombrepdto;
            document.getElementById('Puntoact').value=invent.nombrepuntv;
        });
    });
}
/* =================================================== */
function Mostrarpdto (idpdto){
    var datos = new URLSearchParams();
    datos.append('idptoinve',idpdto);
    fetch('/idpdto_inventario',
    {   method:'post',
        body:datos
    }).then(res=>res.json())
    .then(data=>{
        data.forEach(invent => {
            document.getElementById('id_pdto_inventario').value=invent.Codigo_pdto;
            let name = value=invent.Nombre
            document.getElementById('idnombreproducto').innerHTML = name;
        });
    });
}
/*  */
/* ========================================================================== */
var form = document.getElementById('form-actual-invent');
function Mostrarventana(idpdto,idinv){
    form.reset();
    myModal.show();
    Mostrarinvt(idinv);
    Mostrarpdto(idpdto);
    Listarinventarioproduccio(idpdto);
};
/* =================================================== */
function Listarinventarioproduccio(idproduccion){
    let datosinvproduccion = new URLSearchParams;
    datosinvproduccion.append("idptoibv",idproduccion);
    fetch('/Lista_produccion',
    {
        method:'post',
        body:datosinvproduccion
    }).then(res=>res.json())
    .then(datos=>{
        let json = [];
            let array = {}
            datos.forEach(element => {
                array = {
                    "col-1": element.Id_produccion,
                    "col-2": element.producto,
                    "col-3": element.Producido,
                    "col-4": element.Distribuido,
                    "col-5": element.Disponible,
                    "col-6": element.fecha,
                    "col-7": "<a class='btn-distribucion' onclick='MostrarBodega("+element.Id_produccion+")';>Distribucion</a> <a class='btn-use' onclick='UsarProduccion("+element.Id_produccion+")';>Asignar</a>",
                }
                json.push(array);
            });
        $('#tablaproduccion').DataTable({
            "paging":true,
            "processing":true,
            "responsive":true,
            "destroy":true,
            "data":json,
            dom: 'Bfrtip',
            columns:[
                {"data": "col-1"},
                {"data": "col-2"},
                {"data": "col-3"},
                {"data": "col-4"},
                {"data": "col-5"},
                {"data": "col-6"},
                {"data": "col-7"}
            ]
        })
    });
}
/* =================================================== */
function MostrarBodega(idproduccion){
    modalbodega.show();
    var datos = new URLSearchParams();
    datos.append('idproducci',idproduccion);
    fetch('/Lista_Bodega',
    {   method:'post',
        body:datos
    }).then(res=>res.json())
    .then(datos=>{
        let json = [];
        let array = {}
            datos.forEach(element => {
                array = {
                    "col-1": element.id_bodega,
                    "col-2": element.Nombrepunt,
                    "col-3": element.cantidadbodega,
                    "col-4": element.fechabodega
                }
                json.push(array);
            });
        $('#tablabodega').DataTable({
            "paging":true,
            "processing":true,
            "responsive":true,
            "destroy":true,
            "data":json,
            dom: 'Bfrtip',
            columns:[
                {"data": "col-1"},
                {"data": "col-2"},
                {"data": "col-3"},
                {"data": "col-4"}
            ]
        })
    });
}
/* ========================================================================== */
function ActualizarInv(){
    let identificadoractul = document.getElementById('id_vent').value;
    let stockActul = document.getElementById('inventStockAct').value;
    let productoActul= document.getElementById('fkproductoAct').value;
    let puntoActul = document.getElementById('fkpuntventaAct').value;

    var datos = new URLSearchParams();
    datos.append('Identificacion',identificadoractul);
    datos.append('Stock',stockActul);
    datos.append('Producto',productoActul);
    datos.append('PuntoVent',puntoActul);
  
    fetch('/Actualizar_Invent',
    {   method:'post',
        body : datos}
    ).then(res=>res.json()).then(data=>{
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje,
            timer: 1500
        });
        ListarInventario();
    });
} 
/* =================================================== */
function UsarProduccion(idproduc){
    modalbodega.hide();
    let datesproducci = new URLSearchParams();
    datesproducci.append('idproduccion',idproduc);
    fetch('/llamarproduccion',
    {   method:'post',
        body:datesproducci
    }).then(res=>res.json())
    .then(data=>{
        data.forEach(produccion => {
            document.getElementById('Stockact').value=produccion.Disponible;
            document.getElementById('produccionact').value=produccion.Id_produccion;
        });
    });
};
/* =================================================================== */
function Actualizarinventario(){
    let cantidadinvet = document.getElementById('Stockact').value;
    let numbinventario = document.getElementById('id_invetario').value;
    let numbproduccion = document.getElementById('produccionact').value;
    let tipooperacion = "ActualizarBodega";
        let datosinvent = new URLSearchParams();
        datosinvent.append('operacion',tipooperacion);
        datosinvent.append('cantidad',cantidadinvet);
        datosinvent.append('fk_produccion',numbproduccion);
        datosinvent.append('fk_inventario',numbinventario);
        fetch('/Actualizarinvent',
        { method:'post',
            body:datosinvent
        }).then(res=>res.json())
        .then(data=>{
            Swal.fire({
                title: data.titulo,
                icon: data.icono,
                text: data.mensaje,
                timer: 1500
                })
        });
}