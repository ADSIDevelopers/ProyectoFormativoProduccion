var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
    });

function RegistrarInventario() {
    let stock = document.getElementById('inventStock').value;
    let productos = document.getElementById('fkproducto').value;
    let puntoventa= document.getElementById('fkpuntventa').value;
    
    var datos= new URLSearchParams();
    datos.append('stock',stock);
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
    let tabla = document.getElementById('tbody_date');
    tabla.innerHTML = '';
    fetch('/Lista_Inventario',
        {method:'get'
        })
        .then(res=>res.json())
        .then(data=>{
            data.forEach(Inv => {
                let fila = document.createElement('tr');
                let IdInv = document.createElement('td');
                let StockInv = document.createElement('td');
                let Producto = document.createElement('td');
                let Pventa = document.createElement('td');
                let contenbotones = document.createElement('td');
                let botoneditar = document.createElement('a');
                let botonhabidesabilitar = document.createElement('a');
                /* Adoptacion de valores y llamado de datos por medio del json */
                IdInv.appendChild(document.createTextNode(Inv.id_inventario));
                StockInv.appendChild(document.createTextNode(Inv.stock));
                Producto.appendChild(document.createTextNode(Inv.nombrePdto));
                Pventa.appendChild(document.createTextNode(Inv.nombrePunto));
                contenbotones.appendChild(botoneditar);
                // contenbotones.appendChild(botonhabidesabilitar);
                botoneditar.appendChild(document.createTextNode('Editar'));
                // botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
                /* Atributos*/
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Mostrarventana("+Inv.Codigo_pdto+");");
                fila.appendChild(IdInv)
                fila.appendChild(Pventa);
                fila.appendChild(Producto)
                fila.appendChild(StockInv)
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila) 
             });
        })
}
/* ========================================================================== */
function Mostrarventana(idpdtoinv){
    myModal.show();
    Listarinventarioproduccio(idpdtoinv)
    var datos = new URLSearchParams();
    datos.append('idptoinve',idpdtoinv);
    fetch('/idpdto_inventario',
    {
        method:'post',
        body:datos
    }).then(res=>res.json())
    .then(data=>{
        data.forEach(invent => {
            document.getElementById('id_pdto_inventario').value=invent.Codigo_pdto;
            });
    });
};

function Listarinventarioproduccio(idproduccion){
    let datosinvproduccion = new URLSearchParams;
    datosinvproduccion.append("idptoibv",idproduccion);
    fetch('/Lista_BodegaProduccion',
    {
        method:'post',
        body:datosinvproduccion
    }).then(res=>res.json())
    .then(datos=>{
        $('#tablainventario').DataTable({
            "paging":true,
            "processing":true,
            "responsive":true,
            "destroy":true,
            "data":datos,
            dom: 'Bfrtip',
            columns:[
                {"data":"Id_produccion"},
                {"data":"Nombre_pdto"},
                {"data":"Cantidadprodu"},
                {"data":"id_bodega"},
                {"data":"catidadbode"},
                {"data":"id_inventario"},
                {"data":"fechabodega"}
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
