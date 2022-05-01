
function RegistrarProducto(){
    let form = document.getElementById('form_registro_productos')
    let nombrepdto = document.getElementById('nombreproducto').value;
    let descripcionpdto = document.getElementById('descripcionproducto').value;
    let FileN = document.getElementById('fileNpdto');
    let estadopdto =document.getElementById('estadoproducto').value;
    let reservapdto = document.getElementById('reservaproducto').value;
    let maximopdto = document.getElementById('reservamaxima').value;
    let uppdto = document.getElementById('unidadproductiva').value;
    let tipo = document.getElementById('tipoproducto').value;
    var DatosFormData = new FormData();
        DatosFormData.append('Nombrepdto',nombrepdto);
        DatosFormData.append('img',FileN.files[0]);
        DatosFormData.append('Descripcionpdto',descripcionpdto);
        DatosFormData.append('Estadopdto',estadopdto);
        DatosFormData.append('Reservapdto',reservapdto);
        DatosFormData.append('Maximopdto',maximopdto);
        DatosFormData.append('unidapdtopdto',uppdto);
        DatosFormData.append('tipopdto',tipo);
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
};

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
                let tipo = document.createElement('td');
                let contenbotones = document.createElement('td');
                let botoneditar = document.createElement('a');
                let botonprecios = document.createElement('a');
                /* Adoptacion de valores y llamado de datos por medio del json */
                codigopdto.appendChild(document.createTextNode(pdto.Codigo_pdto));
                Nombrepdto.appendChild(document.createTextNode(pdto.Nombre_pdto));
                imagenpdto.appendChild(imgpdto);
                descripcionpdto.appendChild(document.createTextNode(pdto.Descripcion));
                estadopdto.appendChild(document.createTextNode(pdto.Estado));
                reservapdto.appendChild(document.createTextNode(pdto.Reserva));
                uppdto.appendChild(document.createTextNode(pdto.Nombre_up));
                Maxreserva.appendChild(document.createTextNode(pdto.MaxReserva));
                tipo.appendChild(document.createTextNode(pdto.Tipo));
                contenbotones.appendChild(botoneditar);
                contenbotones.appendChild(botonprecios);
                botoneditar.appendChild(document.createTextNode('Editar'));
                botonprecios.appendChild(document.createTextNode('Precio'));
                /* Atributos*/
                var imageproducto ='/img/products/'+pdto.Imgpdto;
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Buscarproductos("+pdto.Codigo_pdto+");");
                botonprecios.setAttribute("class","btn-sale");
                botonprecios.setAttribute("onclick","Buscarpstoprecio("+pdto.Codigo_pdto+");");
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
                fila.appendChild(tipo);
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila)
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
        document.getElementById('tipoproductoact').value=pdto.tipo;
        });
    });
};
function Actaulizarpdto(){
    let identi = document.getElementById('id_pdto').value;
    let nombrepdto = document.getElementById('nombrepdtoact').value;
    let descripcionpdto = document.getElementById('descrippdtoact').value;
    let FileN = document.getElementById('fileNact');
    let estadopdto =document.getElementById('estadopdtoact').value;
    let reservapdto = document.getElementById('reservapdtoact').value;
    let maximopdto = document.getElementById('maxreserpdtoact').value;
    let uppdto = document.getElementById('uppdtoact').value;
    let tipopdto = document.getElementById('tipoproductoact').value;
    var DatosFormData = new FormData();
    DatosFormData.append('Identificacionact', identi)
    DatosFormData.append('Nombrepdtoact',nombrepdto);
    DatosFormData.append('img',FileN.files[0]);
    DatosFormData.append('Descripcionpdtoact',descripcionpdto);
    DatosFormData.append('Estadopdtoact',estadopdto);
    DatosFormData.append('Reservapdtoact',reservapdto);
    DatosFormData.append('Maximopdtoact',maximopdto);
    DatosFormData.append('unidapdtopdtoact',uppdto);
    DatosFormData.append('tipopdtoact',tipopdto)
    fetch('/Actual_pdto',
    {method:'post',
    body : DatosFormData
    }
    ).then(res=>res.json())
    .then(data=>{
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje,
            timer : data.timer
        });
        ListaProductos();
    });
};

/* =============================================================================*/
    const poupsale = document.querySelector('.content-form-sale');
    const closedsale = document.querySelector('.popup-close-window-sale');
    closedsale.addEventListener('click', () => {
        poupsale.style.display = 'none';
    });
    function Buscarpstoprecio(codgiopdto){
        poupsale.style.display = 'block';
        Listarprecios(codgiopdto)
        let form = document.getElementById('form_sale');
        var datos = new URLSearchParams();
        datos.append('Codigopdto',codgiopdto);
        fetch('/buscar_sale',
        {method:'post',
        body : datos
        }
        ).then(res=>res.json())
        .then(data=>{
            data.forEach(pdtosale => {
            document.getElementById('id_pdto_sale').value=pdtosale.Codigo_pdto;
            });

        });
        form.reset();
    }
    function Listarprecios(pdtoid){
        let tabla$ = document.getElementById('tbody_sale');
        tabla$.innerHTML = "";
        let datosbussale = new URLSearchParams;
        datosbussale.append("idpdto",pdtoid)
        fetch('/Listar_precios',
        {method:'post',
        body:datosbussale
        }
        ).then(res=>res.json())
        .then(data=>{
            data.forEach(pdtosale => {
            let fila$ =  document.createElement('tr');
            let cargo$ = document.createElement('td');
            let producto$ = document.createElement('td');
            let precio$ = document.createElement('td');
            let admin$ = document.createElement('td');
            let botonact$ = document.createElement('a');
            /* Adoptacion de valores y llamado de datos por medio del json */
            cargo$.appendChild(document.createTextNode(pdtosale.cargonombre));
            producto$.appendChild(document.createTextNode(pdtosale.nombrepdto));
            precio$.appendChild(document.createTextNode(pdtosale.preciopdto));
            botonact$.appendChild(document.createTextNode('Editar'));
            /* Atributos*/
            admin$.appendChild(botonact$);
            botonact$.setAttribute("class","btn-edit");
            botonact$.setAttribute("onclick","ObtenerPrecio("+pdtosale.id_precio+");")
            fila$.appendChild(cargo$)
            fila$.appendChild(producto$)
            fila$.appendChild(precio$)
            fila$.appendChild(admin$)
            /* Adopcion de todos los tr > td al tbody */
            tabla$.appendChild(fila$);
            });
        });
    }
    function RegistrarPrecio(){
        let form = document.getElementById('form_sale');
        let id = document.getElementById('id_pdto_sale').value;
        let precio = document.getElementById('precioproducto').value;
        let encargadp = document.getElementById('cargo').value;
        var DatosFormData = new URLSearchParams();
        DatosFormData.append('pdto',id);
        DatosFormData.append('precio',precio);
        DatosFormData.append('cargo',encargadp);
        fetch('/Registrar_precio',
        {method:'post',
        body : DatosFormData
        }
        ).then(res=>res.json())
        .then(data=>{
            Listarprecios(id);
            Swal.fire({
                title: data.titulo,
                icon: data.icono,
                text: data.mensaje,
                timer : data.timer
            });
            form.reset();
        });
    }
function ObtenerPrecio(idprecio){
    let datosale = new URLSearchParams;
    datosale.append("idsale",idprecio);
    fetch('/Mostrar_sale',
    {method:'post',
    body : datosale
    }
    ).then(res=>res.json())
    .then(data=>{
        data.forEach(pdtosale => {
        document.getElementById('id_sale').value=pdtosale.id_precio;
        document.getElementById('cargo').value=pdtosale.fk_cargo;
        document.getElementById('precioproducto').value=pdtosale.precio;
        });
    });
}
function ActualizarPrecio(){
    let idpdtosale = document.getElementById('id_pdto_sale').value;
    let idsale = document.getElementById('id_sale').value;
    let preciosale = document.getElementById('precioproducto').value;
    let cargosale = document.getElementById('cargo').value;
    let datosaleactu = new URLSearchParams;
    datosaleactu.append('idpdto',idpdtosale);
    datosaleactu.append('idsale',idsale);
    datosaleactu.append('preciosale',preciosale);
    datosaleactu.append('cargosale',cargosale),
    fetch('/Actualizar_precios',
    {method:'post',
    body : datosaleactu
    }
    ).then(res=>res.json())
    .then(data=>{
        Listarprecios(idpdtosale);
        Swal.fire({
            title: data.titulo,
            icon: data.icono,
            text: data.mensaje,
            timer : data.timer
        });
    });
}