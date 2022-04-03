function RegistrarUnidad(){
    alert("hola")
    let id = document.getElementById('codigounidad').value;
    let nombr = document.getElementById('nombreunidad').value;
    let logo = document.getElementById('img').value;
    let descri = document.getElementById('descripcionunidad').value;
    let sede = document.getElementById('sedeunidad').value;
    let persona = document.getElementById('personaunidad').value;
    var datos = new URLSearchParams();
    datos.append('codigounidad',id);
    datos.append('nombreunidad',nombr);
    datos.append('img',logo);
    datos.append('descripcionunidad',descri);
    datos.append('sedeunidad',sede);
    datos.append('personaunidad',persona);
    fetch('/Registrar_Unidades',
    {method:'post',
    body : datos}
    ).then(res=>res.text())
    .then(data=>{
    alert(data)
    });
};
function Eliminar(){
    let id = document.getElementById('codigounidad').value;
    var datos = new URLSearchParams();
    datos.append('codigounidad',id);
    fetch('/Eliminar_unidad',
    {body : datos
    }
    ).then(res=>res.text())
    .then(data=>{
    alert(data)
    });
}