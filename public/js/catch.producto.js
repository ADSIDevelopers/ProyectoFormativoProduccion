var datosjson = "";
/* function RegistrarProducto(){
    let idpdto = document.getElementById('codigoproducto');
    let namepdto = document.getElementById('nombreproducto');
    let imgpdto = document.getElementById('formFile-pdto');
    let descpdto = document.getElementById('descripcionproducto');
    let estadopdto = document.getElementById('estadoproducto');
    let reservapdto = document.getElementById('reservaproducto');
    let uppdto = document.getElementById('unidadproductiva');
    let valpdto = document.getElementById('valorproducto');
} */
window.onload = ListaProductos();
function ListaProductos(){
    let tabla = document.getElementById('tbody_date');
    tabla.innerHTML = '';
    fetch('/Lista_pdto',
        {method:'get'
        })
        .then(res=>res.json())
        .then(data=>{
            datosjson=data;
            data.forEach(pdto => {
                let fila = document.createElement('tr');
                let codigopdto = document.createElement('td');
                let Nombrepdto = document.createElement('td');
                let imagenpdto = document.createElement('td');
                let imgpdto = document.createElement('img');
                let descripcionpdto = document.createElement('td');
                let estadopdto = document.createElement('td');
                let reservapdto = document.createElement('td');
                let uppdto = document.createElement('td');
                let valpdto = document.createElement('td');
                let contenbotones = document.createElement('td');
                let botoneditar = document.createElement('a');
                let botonhabidesabilitar = document.createElement('a');
                /* Adoptacion de valores y llamado de datos por medio del json */
                codigopdto.appendChild(document.createTextNode(pdto.Codigo_pdto));
                Nombrepdto.appendChild(document.createTextNode(pdto.Nombre));
                imagenpdto.appendChild(imgpdto);
                descripcionpdto.appendChild(document.createTextNode(pdto.Descripcion));
                estadopdto.appendChild(document.createTextNode(pdto.Estado));
                reservapdto.appendChild(document.createTextNode(pdto.Reserva));
                uppdto.appendChild(document.createTextNode(pdto.fk_codigo_up));
                valpdto.appendChild(document.createTextNode(pdto.Valor_pdto));
                contenbotones.appendChild(botoneditar);
                contenbotones.appendChild(botonhabidesabilitar);
                botoneditar.appendChild(document.createTextNode('Editar'));
                botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
                /* Atributos*/
                let imageproducto ='/img/products/'+ pdto.imagen;
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Mostrarventana();")
                botonhabidesabilitar.setAttribute("class","btn-delete");
                imgpdto.setAttribute("src",imageproducto);
                imgpdto.setAttribute("class","imgpdto")
                fila.appendChild(codigopdto)
                fila.appendChild(Nombrepdto)
                fila.appendChild(imagenpdto);
                fila.appendChild(descripcionpdto)
                fila.appendChild(estadopdto)
                fila.appendChild(reservapdto)
                fila.appendChild(uppdto)
                fila.appendChild(valpdto)
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila) 
             });
        })
}
/* function Mostrarventana(){
    alert("Hola")
} */
window.addEventListener("keydown",function(event){
    let palabraclave = this.document.getElementById("casillasearch").value;
    if(event.key == "Enter"){
        const comparacion = x => x.fk_codigo_up == palabraclave;
       const busquedafiltro = datosjson.filter(comparacion)
       let tabla = document.getElementById('tbody_date');
          tabla.innerHTML='';
          busquedafiltro.forEach(pdto => {
            let fila = document.createElement('tr');
            let codigopdto = document.createElement('td');
            let Nombrepdto = document.createElement('td');
            let imagenpdto = document.createElement('td');
            let imgpdto = document.createElement('img');
            let descripcionpdto = document.createElement('td');
            let estadopdto = document.createElement('td');
            let reservapdto = document.createElement('td');
            let uppdto = document.createElement('td');
            let valpdto = document.createElement('td');
            let contenbotones = document.createElement('td');
            let botoneditar = document.createElement('a');
            let botonhabidesabilitar = document.createElement('a');
            /* Adoptacion de valores y llamado de datos por medio del json */
            codigopdto.appendChild(document.createTextNode(pdto.Codigo_pdto));
            Nombrepdto.appendChild(document.createTextNode(pdto.Nombre));
            imagenpdto.appendChild(imgpdto);
            descripcionpdto.appendChild(document.createTextNode(pdto.Descripcion));
            estadopdto.appendChild(document.createTextNode(pdto.Estado));
            reservapdto.appendChild(document.createTextNode(pdto.Reserva));
            uppdto.appendChild(document.createTextNode(pdto.fk_codigo_up));
            valpdto.appendChild(document.createTextNode(pdto.Valor_pdto));
            contenbotones.appendChild(botoneditar);
            contenbotones.appendChild(botonhabidesabilitar);
            botoneditar.appendChild(document.createTextNode('Editar'));
            botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
            /* Atributos*/
            let imageproducto ='/img/products/'+ pdto.imagen;
            botoneditar.setAttribute("class","btn-edit");
            botoneditar.setAttribute("onclick","Mostrarventana();")
            botonhabidesabilitar.setAttribute("class","btn-delete");
            imgpdto.setAttribute("src",imageproducto);
            imgpdto.setAttribute("class","imgpdto")
            fila.appendChild(codigopdto)
            fila.appendChild(Nombrepdto)
            fila.appendChild(imagenpdto);
            fila.appendChild(descripcionpdto)
            fila.appendChild(estadopdto)
            fila.appendChild(reservapdto)
            fila.appendChild(uppdto)
            fila.appendChild(valpdto)
            fila.appendChild(contenbotones)
            /* Adopcion de todos los tr > td al tbody */
            tabla.appendChild(fila) 
         });
       console.log(busquedafiltro);
    }
})