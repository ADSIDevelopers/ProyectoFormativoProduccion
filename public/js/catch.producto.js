
function RegistrarProducto(){
    let form = document.getElementById('form_registro_productos')
    let nombrepdto = document.getElementById('nombreproducto').value;
    let descripcionpdto = document.getElementById('descripcionproducto').value;
    let FileN = document.getElementById('fileNpdto');
    let estadopdto =document.getElementById('estadoproducto').value;
    let reservapdto = document.getElementById('reservaproducto').value;
    let maximopdto = document.getElementById('reservamaxima').value;
    let uppdto = document.getElementById('unidadproductiva').value;
    var DatosFormData = new FormData();
        DatosFormData.append('Nombrepdto',nombrepdto);
        DatosFormData.append('img',FileN.files[0]);
        DatosFormData.append('Descripcionpdto',descripcionpdto);
        DatosFormData.append('Estadopdto',estadopdto);
        DatosFormData.append('Reservapdto',reservapdto);
        DatosFormData.append('Maximopdto',maximopdto);
        DatosFormData.append('unidapdtopdto',uppdto);
        fetch('/Registrar_pdto',
            {method:'post',
            body : DatosFormData}
            ).then(res=>res.json())
            .then(data=>{
                Swal.fire({
                    title: data.titulo,
                    icon: data.icono,
                    text: data.mensaje,
                    timer : data.timer
                    })
                    form.reset();
                    ListaProductos();
                });
                
}

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
                let Maxreserva = document.createElement('td');
                let contenbotones = document.createElement('td');
                let botoneditar = document.createElement('a');
                /* let botonhabidesabilitar = document.createElement('a'); */
                /* Adoptacion de valores y llamado de datos por medio del json */
                codigopdto.appendChild(document.createTextNode(pdto.Codigo_pdto));
                Nombrepdto.appendChild(document.createTextNode(pdto.Nombre_pdto));
                imagenpdto.appendChild(imgpdto);
                descripcionpdto.appendChild(document.createTextNode(pdto.Descripcion));
                estadopdto.appendChild(document.createTextNode(pdto.Estado));
                reservapdto.appendChild(document.createTextNode(pdto.Reserva));
                uppdto.appendChild(document.createTextNode(pdto.Nombre_up));
                Maxreserva.appendChild(document.createTextNode(pdto.MaxReserva));
                contenbotones.appendChild(botoneditar);
               /*  contenbotones.appendChild(botonhabidesabilitar); */
                botoneditar.appendChild(document.createTextNode('Editar'));
                /* botonhabidesabilitar.appendChild(document.createTextNode('Inactivo')); */
                /* Atributos*/
                let imageproducto ='img/products/Captura de pantalla (1).png';
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Buscarproductos("+pdto.Codigo_pdto+");")
                /* botonhabidesabilitar.setAttribute("class","btn-delete"); */
                imgpdto.setAttribute("src",imageproducto);
                imgpdto.setAttribute("class","imgpdto")
                fila.appendChild(codigopdto)
                fila.appendChild(Nombrepdto)
                fila.appendChild(imagenpdto);
                fila.appendChild(descripcionpdto)
                fila.appendChild(estadopdto)
                fila.appendChild(reservapdto)
                fila.appendChild(uppdto)
                fila.appendChild(Maxreserva)
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila) 
                console.log(imageproducto)
             });
        })
}
function Buscarproductos(ident){
    poupact.style.display = 'block';
    var datos = new URLSearchParams();
    datos.append('Identificacion',ident);
    fetch('/Buscar_pdto',
    {method:'post',
    body : datos
    }
    ).then(res=>res.json())
    .then(data=>{
        data.forEach(pdto => {
        document.getElementById('id_pdto').value=pdto.Codigo_pdto;
        document.getElementById('nombrepdtoact').value=pdto.Nombre;
        document.getElementById('descrippdtoact').value=pdto.Descripcion;
        document.getElementById('estadopdtoact').value=pdto.Estado;
        document.getElementById('reservapdtoact').value=pdto.Reserva;
        document.getElementById('maxreserpdtoact').value=pdto.MaxReserva;
        document.getElementById('uppdtoact').value=pdto.fk_codigo_up;
        });
    });
}
function Actaulizarpdto(){
    let identi = document.getElementById('id_pdto').value;
    let nombrepdto = document.getElementById('nombrepdtoact').value;
    let descripcionpdto = document.getElementById('descrippdtoact').value;
    let FileN = document.getElementById('fileNact');
    let estadopdto =document.getElementById('estadopdtoact').value;
    let reservapdto = document.getElementById('reservapdtoact').value;
    let maximopdto = document.getElementById('maxreserpdtoact').value;
    let uppdto = document.getElementById('uppdtoact').value;
    var DatosFormData = new FormData();
    DatosFormData.append('Identificacionact', identi)
    DatosFormData.append('Nombrepdtoact',nombrepdto);
    DatosFormData.append('img',FileN.files[0]);
    DatosFormData.append('Descripcionpdtoact',descripcionpdto);
    DatosFormData.append('Estadopdtoact',estadopdto);
    DatosFormData.append('Reservapdtoact',reservapdto);
    DatosFormData.append('Maximopdtoact',maximopdto);
    DatosFormData.append('unidapdtopdtoact',uppdto);
    fetch('/Actual_pdto',
    {method:'post',
    body : DatosFormData
    }
    ).then(res=>res.json())
    .then(data=>{
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje
        });
        ListaProductos();
    });
};