var datosjson = "";
/* function RegistrarUnidad(){
    let idup = document.getElementById('codigounidad');
    let nameup = document.getElementById('nombreunidad');
    let imgup = document.getElementById('formFile-up');
    let descup = document.getElementById('descripcionunidad');
    let personaencarcup = document.getElementById('personaunidad');
    let sedeup = document.getElementById('sedeunidad');
    var DatosFormData = new FormData();
    DatosFormData.append('Identificacion',idup);
    DatosFormData.append('Nombre',nameup);
    DatosFormData.append('Imagen',imgup.files[0]);
    DatosFormData.append('Descripcion',descup);
    DatosFormData.append('PersonaEncargada',personaencarcup);
    DatosFormData.append('Sede',sedeup);
    console.log(DatosFormData)
    fetch('/RegistrarUnidadProductiva',
        {method:'post',
        body : DatosFormData}
        ).then(res=>res.text())
        .then(data=>{
            console.log(data)
            });
} */
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
                var personaencargup = document.createElement('td');
                var contenbotones = document.createElement('td');
                var botoneditar = document.createElement('a');
                var botonhabidesabilitar = document.createElement('a');
                /* Adoptacion de valores y llamado de datos por medio del json */
                codioup.appendChild(document.createTextNode(up.codigo_up));
                Nombreup.appendChild(document.createTextNode(up.Nombre));
                logoup.appendChild(imglogo);
                descripcionup.appendChild(document.createTextNode(up.Descripcion));
                sedeup.appendChild(document.createTextNode(up.sede));
                personaencargup.appendChild(document.createTextNode(up.fk_persona));
                contenbotones.appendChild(botoneditar);
                contenbotones.appendChild(botonhabidesabilitar);
                botoneditar.appendChild(document.createTextNode('Editar'));
                botonhabidesabilitar.appendChild(document.createTextNode('Habilitar'));
                /* Atributos*/
                var imagelogo ='/img/logos/'+ up.Logo;
                botoneditar.setAttribute("class","btn-edit");
                botoneditar.setAttribute("onclick","Mostrarventana();")
                botonhabidesabilitar.setAttribute("class","btn-delete");
                imglogo.setAttribute("src",imagelogo);
                imglogo.setAttribute("class","imgup")
                fila.appendChild(codioup)
                fila.appendChild(Nombreup)
                fila.appendChild(logoup);
                fila.appendChild(descripcionup)
                fila.appendChild(sedeup)
                fila.appendChild(personaencargup)
                fila.appendChild(contenbotones)
                /* Adopcion de todos los tr > td al tbody */
                tabla.appendChild(fila) 
             });
        })
        
};
window.addEventListener("keydown",function(event){
    let palabraclave = document.getElementById("casillasubject").value;
    const comparacion = x => x.sede == palabraclave;
    const busquedafiltro = datosjson.filter(comparacion);
    if(event.key == "Enter"){
        let tabla = document.getElementById('tbody_date');
    tabla.innerHTML='';
    busquedafiltro.forEach(up =>{
      var fila = document.createElement('tr');
      var codioup = document.createElement('td');
      var Nombreup = document.createElement('td');
      var logoup = document.createElement('td');
      var imglogo = document.createElement('img');
      var descripcionup = document.createElement('td');
      var sedeup = document.createElement('td');
      var personaencargup = document.createElement('td');
      var contenbotones = document.createElement('td');
      var botoneditar = document.createElement('a');
      var botonhabidesabilitar = document.createElement('a');
      /* Adoptacion de valores y llamado de datos por medio del json */
      codioup.appendChild(document.createTextNode(up.codigo_up));
      Nombreup.appendChild(document.createTextNode(up.Nombre));
      logoup.appendChild(imglogo);
      descripcionup.appendChild(document.createTextNode(up.Descripcion));
      sedeup.appendChild(document.createTextNode(up.sede));
      personaencargup.appendChild(document.createTextNode(up.fk_persona));
      contenbotones.appendChild(botoneditar);
      contenbotones.appendChild(botonhabidesabilitar);
      botoneditar.appendChild(document.createTextNode('Editar'));
      botonhabidesabilitar.appendChild(document.createTextNode('Habilitar'));
      /* Atributos*/
      var imagelogo ='/img/logos/'+ up.Logo;
      botoneditar.setAttribute("class","btn-edit");
      botoneditar.setAttribute("onclick","Mostrarventana();")
      botonhabidesabilitar.setAttribute("class","btn-delete");
      imglogo.setAttribute("src",imagelogo);
      imglogo.setAttribute("class","imgup")
      fila.appendChild(codioup)
      fila.appendChild(Nombreup)
      fila.appendChild(logoup);
      fila.appendChild(descripcionup)
      fila.appendChild(sedeup)
      fila.appendChild(personaencargup)
      fila.appendChild(contenbotones)
      /* Adopcion de todos los tr > td al tbody */
      tabla.appendChild(fila) 
    })
 console.log(busquedafiltro);
    }
})
function l(){
    
}