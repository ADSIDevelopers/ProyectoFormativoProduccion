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
                botoneditar.setAttribute("onclick","Mostrarventana("+Inv.id_inventario+");");
                fila.appendChild(IdInv)
                fila.appendChild(StockInv)
                fila.appendChild(Producto)
                fila.appendChild(Pventa);
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila) 
             });
        })
}
/* ========================================================================== */
function Mostrarventana(ident){
    poupact.style.display = 'block';
    var datos = new URLSearchParams();
    datos.append('Identificacion',ident);
    fetch('/Buscar_Invent',
    {method:'post',
    body : datos
    }
    ).then(res=>res.json())
    .then(data=>{
        data.forEach(Inv => {
        document.getElementById('id_vent').value=Inv.id_inventario;
        document.getElementById('inventStockAct').value=Inv.stock;
        document.getElementById('fkproductoAct').value=Inv.fk_codigo_pdto;
        document.getElementById('fkpuntventaAct').value=Inv.fk_id_punto_vent;
        });
    });
};

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