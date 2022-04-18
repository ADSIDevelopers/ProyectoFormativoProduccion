var datosjson = "";
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
            text: data.mensaje
            })
            ListarInventario();
    });
}


window.onload = ListarInventario();
function ListarInventario(){
    let tabla = document.getElementById('tbody_date');
    tabla.innerHTML = '';
    fetch('/Lista_Inventario',
        {method:'get'
        })
        .then(res=>res.json())
        .then(data=>{
            datosjson=data;
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
                Producto.appendChild(document.createTextNode(Inv.fk_codigo_pdto));
                Pventa.appendChild(document.createTextNode(Inv.fk_id_punto_vent));
                contenbotones.appendChild(botoneditar);
                contenbotones.appendChild(botonhabidesabilitar);
                botoneditar.appendChild(document.createTextNode('Editar'));
                botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
                /* Atributos*/
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Mostrarventana();");
                botonhabidesabilitar.setAttribute("class","btn-delete");
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

/* ======================= */

window.addEventListener("keydown",function(event){
    let palabraclave = this.document.getElementById("casillasearch").value;
    if(event.key == "Enter"){
        const comparacion = x => x.fk_id_punto_vent == palabraclave;
       const busquedafiltro = datosjson.filter(comparacion)
       let tabla = document.getElementById('tbody_date');
          tabla.innerHTML='';
          busquedafiltro.forEach(Inv => {
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
            Producto.appendChild(document.createTextNode(Inv.fk_codigo_pdto));
            Pventa.appendChild(document.createTextNode(Inv.fk_id_punto_vent));
            contenbotones.appendChild(botoneditar);
            contenbotones.appendChild(botonhabidesabilitar);
            botoneditar.appendChild(document.createTextNode('Editar'));
            botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
            /* Atributos*/
            botoneditar.setAttribute("class","btn-edit");
            botoneditar.setAttribute("onclick","Mostrarventana();");
            botonhabidesabilitar.setAttribute("class","btn-delete");
            fila.appendChild(IdInv)
            fila.appendChild(StockInv)
            fila.appendChild(Producto)
            fila.appendChild(Pventa);
            fila.appendChild(contenbotones)
            /* Adopcion de todos los tr > td al tbody */
            tabla.appendChild(fila) 
         });
       console.log(busquedafiltro);
    }
})