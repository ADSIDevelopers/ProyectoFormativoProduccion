var datosjson = "";
function RegistrarUnidad(){
    let form = document.getElementById('form_registro_unidadesproductivas')
    let FileN = document.getElementById('fileN');
    let datofecha = Date.now();
    let nameup = document.getElementById('nombreunidad').value;
    let descup = document.getElementById('descripcionunidad').value;
    let personaencarcup = document.getElementById('personaunidad').value;
    let sedeup = document.getElementById('sedeunidad').value;
    let estado = document.getElementById('estadounidad').value;
    let entrega = document.getElementById('entregaunidad').value;
    var DatosFormData = new FormData();
    DatosFormData.append('Nombre',nameup);
    DatosFormData.append('img',FileN.files[0]);
    DatosFormData.append('Descripcion',descup);
    DatosFormData.append('Estado',estado);
    DatosFormData.append('Entrega',entrega);
    DatosFormData.append('PersonaEncargada',personaencarcup);
    DatosFormData.append('Sede',sedeup);
        fetch('/RegistrarUnidadProductiva',
            {method:'post',
            body : DatosFormData}
            ).then(res=>res.json())
            .then(data=>{
                Swal.fire({
                    title: data.titulo,
                    icon: data.icono,
                    text: data.mensaje,
                    timer : data.timer
                });
                form.reset();
                ListaUnidadesProductivas();
            });
}
window.onload = ListaUnidadesProductivas();
function ListaUnidadesProductivas(){
    let tabla = document.getElementById('tbody_date');
    tabla.innerHTML = '';
    fetch('/Lista_unidadesproductivas',
        {method:'get'
        })
        .then(res=>res.json())
        .then(data=>{
            datosjson=data;
            data.forEach(up => {
                var fila = document.createElement('tr');
                var codioup = document.createElement('td');
                var Nombreup = document.createElement('td');
                var logoup = document.createElement('td');
                var imglogo = document.createElement('img');
                var descripcionup = document.createElement('td');
                var sedeup = document.createElement('td');
                var estado = document.createElement('td');
                var entrega = document.createElement('td');
                var personaencargup = document.createElement('td');
                var contenbotones = document.createElement('td');
                var botoneditar = document.createElement('a');
                /* var botonhabidesabilitar = document.createElement('a'); */
                /* Adoptacion de valores y llamado de datos por medio del json */
                codioup.appendChild(document.createTextNode(up.codigo_up));
                Nombreup.appendChild(document.createTextNode(up.Nombre));
                logoup.appendChild(imglogo);
                descripcionup.appendChild(document.createTextNode(up.Descripcion));
                sedeup.appendChild(document.createTextNode(up.sede));
                estado.appendChild(document.createTextNode(up.estado));
                entrega.appendChild(document.createTextNode(up.entrega_producto));
                personaencargup.appendChild(document.createTextNode(up.Nombres));
                
                contenbotones.appendChild(botoneditar);
                /* contenbotones.appendChild(botonhabidesabilitar); */
                botoneditar.appendChild(document.createTextNode('Editar'));
               /*  botonhabidesabilitar.appendChild(document.createTextNode('Habilitar')); */
                /* Atributos*/
                var imagelogo ='/img/logos/'+ up.Logo;
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Mostrarventanaup("+up.codigo_up+");")
                /* botonhabidesabilitar.setAttribute("class","btn-delete"); */
                imglogo.setAttribute("src",imagelogo);
                imglogo.setAttribute("class","imgup")
                fila.appendChild(codioup)
                fila.appendChild(Nombreup)
                fila.appendChild(logoup);
                fila.appendChild(descripcionup)
                fila.appendChild(sedeup)
                fila.appendChild(estado)
                fila.appendChild(entrega)
                fila.appendChild(personaencargup)
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila) 
             });
        })
}
function Mostrarventanaup(ident){
    poupact.style.display = 'block';
    var datos = new URLSearchParams();
    datos.append('Identificacion',ident);
    fetch('/Buscar_UP',
    {method:'post',
    body : datos
    }
    ).then(res=>res.json())
    .then(data=>{
        data.forEach(up => {
        document.getElementById('id_up').value=up.codigo_up;
        document.getElementById('nombreunidadactual').value=up.Nombre;
        document.getElementById('descripcionunidadactual').value=up.Descripcion;
        document.getElementById('sedeunidadactual').value=up.sede;
        document.getElementById('estadounidadactual').value=up.estado;
        document.getElementById('entregaunidadactual').value=up.entrega_producto;
        document.getElementById('personaunidaencargadadactual').value=up.fk_persona;
        console.log(up.fk_persona)
        });
    });
}
function ActualizarUP(){
    let FileN = document.getElementById('fileNact');
    let identidicacion = document.getElementById('id_up').value;
        let datofecha = Date.now();
        let nameup = document.getElementById('nombreunidadactual').value;
        let descup = document.getElementById('descripcionunidadactual').value;
        let personaencarcup = document.getElementById('personaunidaencargadadactual').value;
        let sedeup = document.getElementById('sedeunidadactual').value;
        let estado = document.getElementById('estadounidadactual').value;
        let entrega = document.getElementById('entregaunidadactual').value;
        var DatosFormData = new FormData();
        DatosFormData.append('Identificacion',identidicacion);
        DatosFormData.append('Nombre',nameup);
        DatosFormData.append('img',FileN.files[0]);
        DatosFormData.append('Descripcion',descup);
        DatosFormData.append('Estado',estado);
        DatosFormData.append('Entrega',entrega);
        DatosFormData.append('PersonaEncargada',personaencarcup);
        DatosFormData.append('Sede',sedeup);
        fetch('/Actualizar_up',
            {method:'post',
            body : DatosFormData}
            ).then(res=>res.json())
            .then(data=>{
                Swal.fire({
                    title: data.titulo,
                    icon: data.icono,
                    text: data.mensaje
                });
                ListaUnidadesProductivas();
            });
};