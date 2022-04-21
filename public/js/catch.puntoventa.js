window.onload = ListaPuntoVenta();
var datosjson = "";

function RegistrarPuntoventa() {
    let formulario = document.getElementById('formregistro');
    let nombre = document.getElementById('nombrepunvnt').value;
    let sede = document.getElementById('sedepuntventa').value;
    let direccion = document.getElementById('direccionpunvnt').value;
    let estado = document.getElementById('estadopuntventa').value;
    let encargado = document.getElementById('personapuntventa').value;
    var datos= new URLSearchParams();
    datos.append('Nombre',nombre);
    datos.append('Sede',sede);
    datos.append('Estado',estado);
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
            text: data.mensaje,
            timer: 1500
            })
            
            formulario.reset();
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
                let estadoPventa = document.createElement('td');
                let contenbotones = document.createElement('td');
                let botoneditar = document.createElement('a');
                // let botonhabidesabilitar = document.createElement('a');
                /* Adoptacion de valores y llamado de datos por medio del json */
                IdPventa.appendChild(document.createTextNode(Pventa.Id_punto_vent));
                sedePventa.appendChild(document.createTextNode(Pventa.Sede));
                direccionPventa.appendChild(document.createTextNode(Pventa.dirPunto));
                nombrePventa.appendChild(document.createTextNode(Pventa.Nombre));
                encargadoPventa.appendChild(document.createTextNode(Pventa.Nombres));
                estadoPventa.appendChild(document.createTextNode(Pventa.EstadoPVent));
                contenbotones.appendChild(botoneditar);
                // contenbotones.appendChild(botonhabidesabilitar);
                botoneditar.appendChild(document.createTextNode('Editar'));
                // botonhabidesabilitar.appendChild(document.createTextNode('Inactivo'));
                /* Atributos*/
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Mostrarventana("+Pventa.Id_punto_vent+");");
                // botonhabidesabilitar.setAttribute("class","btn-delete");
                // botonhabidesabilitar.setAttribute("id","btn-estado");
              
                fila.appendChild(IdPventa);
                fila.appendChild(nombrePventa);
                fila.appendChild(direccionPventa);
                fila.appendChild(sedePventa);
                fila.appendChild(estadoPventa);
                fila.appendChild(encargadoPventa);
                fila.appendChild(contenbotones);
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
        document.getElementById('id_vent').value=Pventa.Id_punto_vent;
        document.getElementById('nombrepunvntactul').value=Pventa.Nombre;
        document.getElementById('sedepuntventaactul').value=Pventa.Sede;
        document.getElementById('direccionpunvntactul').value=Pventa.Direccion;
        document.getElementById('estadopuntventaActul').value=Pventa.Estado;
        document.getElementById('personapuntventaactul').value=Pventa.fk_persona;
        });
    });
};


/* ========================================================================== */
function Actualizar(){
    let identificadoractul = document.getElementById('id_vent').value;
    let nombrepunvntactul = document.getElementById('nombrepunvntactul').value;
    let sedepuntventaactul= document.getElementById('sedepuntventaactul').value;
    let direccionpunvntactul = document.getElementById('direccionpunvntactul').value;
    let estadopuntvntActul = document.getElementById('estadopuntventaActul').value;
    let personapuntventaactul = document.getElementById('personapuntventaactul').value;
    var datos = new URLSearchParams();
    datos.append('Identificacion',identificadoractul);
    datos.append('Nombre',nombrepunvntactul);
    datos.append('Sede',sedepuntventaactul);
    datos.append('Direccion',direccionpunvntactul);
    datos.append('Estado',estadopuntvntActul);
    datos.append('PersonaEncargada',personapuntventaactul);
    fetch('/Actualizar_punvnt',
    {   method:'post',
        body : datos}
    ).then(res=>res.json()).then(data=>{
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje,
  timer: 1500

        });
            ListaPuntoVenta();
    });
} 
/* ========================================================================== */