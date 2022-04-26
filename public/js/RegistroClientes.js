var registro = new bootstrap.Modal(document.getElementById('modalRegistro'), { keyboard: false });

function registroCliente(){
    registro;
    registro.toggle();

}

var actualizar = new bootstrap.Modal(document.getElementById('modalActualizar'), { keyboard:false});

function buscarUsuario(){
    actualizar;
    actualizar.toggle();
}
/* ================listar base de datos========== */
listar_Usuarios();
function listar_Usuarios(){
    var tabla = document.getElementById('cuerpo-tabla');
    tabla.innerHTML = '';
   
    fetch('/listar_usuarios',{
        method: 'get'
    }).then(res => res.json())
    .then(data => {

         data.forEach( user => {
                let fila = document.createElement('tr');
                let Identificacion = document.createElement('td');
                let Nombre = document.createElement('td');
                let correo = document.createElement('td');
                let direccion = document.createElement('td');
                let telefono = document.createElement('td');
                let cargo = document.createElement('td');
                let rol = document.createElement('td');
                let ficha = document.createElement('td');
                let estado = document.createElement('td');
                let buscar = document.createElement('td');

                Identificacion.appendChild(document.createTextNode(user.identificacion));
                Nombre.appendChild(document.createTextNode(user.Nombres));
                correo.appendChild(document.createTextNode(user.Correo));
                direccion.appendChild(document.createTextNode(user.Direccion));
                telefono.appendChild(document.createTextNode(user.Telefono));
                cargo.appendChild(document.createTextNode(user.Cargo));
                rol.appendChild(document.createTextNode(user.Rol));
                ficha.appendChild(document.createTextNode(user.Ficha));
                estado.appendChild(document.createTextNode(user.Estado));
                
                buscar.innerHTML = "<a href= 'javascript:buscarUsuario("+user.identificacion+");'><i class='icon-check'></i>Actualizar</a>"
                buscar.setAttribute('class','actualizar')

                fila.appendChild(Identificacion);
                fila.appendChild(Nombre);
                fila.appendChild(correo);
                fila.appendChild(direccion);
                fila.appendChild(telefono);
                fila.appendChild(cargo);
                fila.appendChild(rol);
                fila.appendChild(ficha);
                fila.appendChild(estado);
               
                fila.appendChild(buscar);
          
                tabla.appendChild(fila)
            });
    });
}

/* =============================registro de usuarios=============== */
function registrarUsuario(){
    var id =document.getElementById("iden").value;
    var nom = document.getElementById("nomb").value;
    var correo = document.getElementById("corr").value;
    var direccion = document.getElementById('direc').value;
    var tel =document.getElementById('tele').value;
    var ficha = document.getElementById('ID').value;
    var cargo = document.getElementById('cargo').value;
    var rol = document.getElementById('rol').value;
    var estado = 1;
    var datos= new URLSearchParams();
    /* parametro de datos */
    /* usuarios */
    datos.append('user',id);
    datos.append('pass',id);
    /* forumario */
    datos.append('identificacion', id);
    datos.append('nombre',nom);
    datos.append('correo',correo);
    datos.append('direccion',direccion);
    datos.append('telefono',tel);
    datos.append('ficha',ficha)
    datos.append('cargo',cargo);
    datos.append('rol',rol);
    datos.append('estado',estado);
   

  fetch("/registro",
  {method:'post',
  body : datos  }
  ).then(res=>res.json())
  .then(data=>{
  if(data.status == 200) {
    lanzadorModal('success',data.msg)
  }
  else{
    lanzadorModal('error','error al hacer el registro')
  }
  });

  listar_Usuarios();
  registro.hide();
    
}

/* ===============actualizar============= */
function buscarUsuario(ident){

    var datos= new URLSearchParams();
    datos.append('identificacion',ident);
    
    fetch('/buscar',
    {method: 'post',
    body: datos
    }
    ).then(res=>res.json())
    .then(data=>{
        console.log(data);
        console.log(data.identificacion)
        document.getElementById('idenR').value = data.identificacion;
        document.getElementById('nombR').value = data.Nombres;
        document.getElementById('corrR').value = data.Correo;
        document.getElementById('direcR').value = data.Direccion;
        document.getElementById('telR').value = data.Telefono;
        document.getElementById('idR').value = data.Ficha;
        document.getElementById('cargoR').value = data.Cargo;
        document.getElementById('rolR').value = data.Rol;
        document.getElementById('estado').value = data.Estado;
      
        actualizar.show();
    });
   
    }
    
    
/* ===========boton actualizar================ */
function actualizarRegistro(){
    var id  = document.getElementById('idenR').value;
    var nom = document.getElementById('nombR').value;
    var correo =  document.getElementById('corrR').value;
    var direc =   document.getElementById('direcR').value;
    var tel =   document.getElementById('telR').value;
    var ficha =     document.getElementById('idR').value;
    var cargo =    document.getElementById('cargoR').value;
    var rol =    document.getElementById('rolR').value;
    var estado = document.getElementById('estado').value;
    var datos= new URLSearchParams();
 
  datos.append('identificacion',id);
  datos.append('nombre',nom);
  datos.append('correo',correo);
  datos.append('direccion',direc);
  datos.append('telefono',tel);
  datos.append('ficha',ficha);
  datos.append('cargo',cargo);
  datos.append('rol',rol);
  datos.append('estado',estado);
  
  fetch("/actualizar",
  {method:'post',
  body : datos  }
  ).then(res=>res.json())
  .then(data=>{
  actualizar.hide()
  listar_Usuarios();
  
  if(data.status == 200) {
    lanzadorModal('success',data.msg)
  }
  else{
    lanzadorModal("error",data.msg)
  }
  });
  clear()

}

/* ====================alerta dinamica============== */
function lanzadorModal(icono,titulo){
  Swal.fire({
  icon: icono,
  title: titulo,
  showConfirmButton: false,
  timer: 1000
  
});
}

/* ==================funcion limpiar============ */
function clear(){
    document.getElementById("cargoR").value = "";
    document.getElementById("rolR").value = "";
}