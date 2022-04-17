window.onload = ListaPuntoVenta();
var datosjson = "";
var myModal = document.getElementById('myModal');
   
function RegistrarPuntoventa() {
    let nombre = document.getElementById('nombrepunvnt').value;
    let sede = document.getElementById('sedepuntventa').value;
    let direccion = document.getElementById('direccionpunvnt').value;
    let encargado = document.getElementById('personapuntventa').value;
    var datos= new URLSearchParams();
    datos.append('Nombre',nombre);
    datos.append('Sede',sede);
    datos.append('Direccion',direccion);
    datos.append('Persona',encargado);
    fetch('/Registrar_PuntoVenta',
    {   method:'post',
        body:datos}
    ).then(res=>res.json())
    .then(data=>{
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje
            })
            ListaPuntoVenta();
    });
};
/* ========================================================================== */
function ListaPuntoVenta(){
    let tabla = document.getElementById('tbody_date');
    tabla.innerHTML = '';
    fetch('/Lista_PuntoVenta',
        {method:'get'
        })
        .then(res=>res.json())
        .then(data=>{
            datosjson=data;
            data.forEach(Pventa => {
                let fila = document.createElement('tr');
                let IdPventa = document.createElement('td');
                let sedePventa = document.createElement('td');
                let direccionPventa = document.createElement('td');
                let nombrePventa = document.createElement('td');
                let encargadoPventa = document.createElement('td');
                let contenbotones = document.createElement('td');
                let botoneditar = document.createElement('a');
                let botonhabidesabilitar = document.createElement('a');
                /* Adoptacion de valores y llamado de datos por medio del json */
                IdPventa.appendChild(document.createTextNode(Pventa.Id_punto_vent));
                sedePventa.appendChild(document.createTextNode(Pventa.Sede));
                direccionPventa.appendChild(document.createTextNode(Pventa.Direccion));
                nombrePventa.appendChild(document.createTextNode(Pventa.Nombre));
                encargadoPventa.appendChild(document.createTextNode(Pventa.fk_persona));
                contenbotones.appendChild(botoneditar);
                contenbotones.appendChild(botonhabidesabilitar);
                botoneditar.appendChild(document.createTextNode('Editar'));
                botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
                /* Atributos*/
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Mostrarventana("+Pventa.Id_punto_vent+");");
                botonhabidesabilitar.setAttribute("class","btn-delete");
                fila.appendChild(IdPventa)
                fila.appendChild(nombrePventa)
                fila.appendChild(direccionPventa)
                fila.appendChild(sedePventa);
                fila.appendChild(encargadoPventa)
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila) 
             });
        });
};
/* ========================================================================== */
function Mostrarventana(ident){
    poupact.style.display = 'block';
    var datos = new URLSearchParams();
    datos.append('Identificacion',ident);
    fetch('/Buscar_punvnt',
    {method:'post',
    body : datos
    }
    ).then(res=>res.json())
    .then(data=>{
        data.forEach(Pventa => {
        document.getElementById('nombrepunvntactul').value=Pventa.Nombre;
        document.getElementById('sedepuntventaactul').value=Pventa.Sede;
        document.getElementById('direccionpunvntactul').value=Pventa.Direccion;
        document.getElementById('personapuntventaactul').value=Pventa.fk_persona;
        });
    });
};

/* ========================================================================== */
/* function Actualizar(){
    let ident = Mostrarventana();
    let nombrepunvntactul = document.getElementById('nombrepunvntactul').value;
    let sedepuntventaactul= document.getElementById('sedepuntventaactul').value;
    let direccionpunvntactul = document.getElementById('direccionpunvntactul').value;
    let personapuntventaactul = document.getElementById('personapuntventaactul').value;
    var datos = new URLSearchParams();
    datos.append('Identificacion',ident);
    datos.append('Nombre',nombrepunvntactul);
    datos.append('Sede',sedepuntventaactul);
    datos.append('Direccion',direccionpunvntactul);
    datos.append('PersonaEncargada',personapuntventaactul);
    fetch('/Actualizar_punvnt',
    {   method:'post',
        body : datos}
    ).then(res=>res.json()).then(data=>{
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje
        });
            ListaPuntoVenta();
    });
} */
/* ========================================================================== */
window.addEventListener("keydown",function(event){
    let palabraclave = this.document.getElementById("casillasearch").value;
    if(event.key == "Enter"){
    const comparacion = x => x.Sede == palabraclave;
       const busquedafiltro = datosjson.filter(comparacion)
       let tabla = document.getElementById('tbody_date');
       tabla.innerHTML='';
       busquedafiltro.forEach(Pventa => {
        let fila = document.createElement('tr');
        let IdPventa = document.createElement('td');
        let sedePventa = document.createElement('td');
        let direccionPventa = document.createElement('td');
        let nombrePventa = document.createElement('td');
        let encargadoPventa = document.createElement('td');
        let contenbotones = document.createElement('td');
        let botoneditar = document.createElement('a');
        let botonhabidesabilitar = document.createElement('a');
        /* Adoptacion de valores y llamado de datos por medio del json */
        IdPventa.appendChild(document.createTextNode(Pventa.Id_punto_vent));
        sedePventa.appendChild(document.createTextNode(Pventa.Sede));
        direccionPventa.appendChild(document.createTextNode(Pventa.Direccion));
        nombrePventa.appendChild(document.createTextNode(Pventa.Nombre));
        encargadoPventa.appendChild(document.createTextNode(Pventa.fk_persona));
        contenbotones.appendChild(botoneditar);
        contenbotones.appendChild(botonhabidesabilitar);
        botoneditar.appendChild(document.createTextNode('Editar'));
        botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
        /* Atributos*/
        botoneditar.setAttribute("class","btn-edit");
        botoneditar.setAttribute("onclick","Mostrarventana("+Pventa.Id_punto_vent+");")
        botonhabidesabilitar.setAttribute("class","btn-delete");
        fila.appendChild(IdPventa)
        fila.appendChild(nombrePventa)
        fila.appendChild(direccionPventa)
        fila.appendChild(sedePventa);
        fila.appendChild(encargadoPventa)
        fila.appendChild(contenbotones)
        /* Adopcion de todos los tr > td al tbody */
        tabla.appendChild(fila) 
     });
       console.log(busquedafiltro);
    }
})