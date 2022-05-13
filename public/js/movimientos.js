$(document).ready(function() {
    $("#tableFacturar").DataTable({
        destroy: true,
        searching: false,
        paging: false,
        bInfo: false,
        bFilter: false,
        language: {
            decimal: ",",
            thousands: ".",
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron resultados",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            sSearch: "Buscar:",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            sProcessing: "Cargando...",
        },
    });


    $("#modalDetalle").on("hidden.bs.modal", function() {
        document.getElementById("contDet").innerHTML = "";
        alert("Modal Cerrado");
    });


    $("#modalNewVenta").on("hidden.bs.modal", function() {
        document.getElementById("inputPIdCliente").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("tusuario").value = "";
        document.getElementById("add-prod").innerHTML = "";
        document.getElementById("id_movimiento").value = "";
        let btnProductos = document.getElementById("boton_agregar_productos");
        btnProductos.disabled = true;
        btnProductos.setAttribute('id', 'btn-deshabilitado');




    });

});

var facturar = new bootstrap.Modal(document.getElementById("modalFacturar"), {
    keyboard: false,
});

function compranueva() {
    facturar.toggle();
}

var newVenta = new bootstrap.Modal(document.getElementById("modalNewVenta"), {
    keyboard: false,
});

function nuevaVenta() {
    newVenta.toggle();
}


var detalle = new bootstrap.Modal(document.getElementById("modalDetalle"), {
    keyboard: false,
});



var addProdList = new bootstrap.Modal(document.getElementById("modalAddProd"), {
    keyboard: false,
});

function addProdVen() {
    //Tabla del modal donde agregaremos los productos a la venta
    tusuario = document.getElementById('tusuario').value;
    let datos = new URLSearchParams();
    datos.append("idcodigo", tusuario);
    try {
        fetch("/addProd", {
                method: "get",
            })
            .then((res) => res.json())
            .then((data) => {

                for (let i = 0; i < data.length; i++) {
                    let TipoUsuario = parseInt(document.getElementById("tusuario").value);
                    let tableAddprod = document.getElementById("add-prod");
                    let tusuarioDOM;

                    switch (TipoUsuario) {
                        case 1:
                            tusuarioDOM = data[i].aprendiz;
                            break;
                        case 2:
                            tusuarioDOM = data[i].instructor;
                            break;
                        case 3:
                            tusuarioDOM = data[i].administrativo;
                            break;
                        case 4:
                            tusuarioDOM = data[i].externo;
                            break;
                        case 5:
                            tusuarioDOM = data[i].auxiliar;
                            break;
                        default:
                            break;
                    }

                    let col1 = document.createElement("tr");
                    let row1 = document.createElement("td");
                    let row2 = document.createElement("td");
                    let row3 = document.createElement("td");
                    let row4 = document.createElement("td");
                    let row5 = document.createElement("td");

                    //Textos de los datos de la tabla
                    let codigoPdto = document.createTextNode(data[i].id_inventario);
                    let nombreProd = document.createTextNode(data[i].Producto);
                    let precioProd = document.createTextNode("$ " + tusuarioDOM);
                    let upProd = document.createTextNode(data[i].stock);
                    row5.innerHTML =
                        "<a class='agregarButton' href='javascript:agregar(" +
                        data[i].id_inventario +
                        ");'>Agregar</a>";


                    //Atributos de los td
                    row1.setAttribute("scope", "row");
                    row1.setAttribute("class", "row1");
                    row2.setAttribute("scope", "row");
                    row3.setAttribute("scope", "row");
                    row4.setAttribute("scope", "row");
                    row5.setAttribute("id", "row5");
                    /* agregar.setAttribute("type", 'button');
                          agregar.setAttribute("id", 'add-lk');
                          agregar.setAttribute("class", 'add-lk'); */

                    //Padre de los elementos de la tabla
                    tableAddprod.appendChild(col1);
                    col1.appendChild(row1);
                    col1.appendChild(row2);
                    col1.appendChild(row3);
                    col1.appendChild(row4);
                    col1.appendChild(row5);
                    row1.appendChild(codigoPdto);
                    row2.appendChild(nombreProd);
                    row3.appendChild(precioProd);
                    row4.appendChild(upProd);
                }


                setTimeout(() => {
                    $("#tableAddProd").DataTable({
                        bInfo: false,
                        destroy: true,
                        language: {
                            decimal: ",",
                            thousands: ".",
                            lengthMenu: "Mostrar _MENU_ registros",
                            zeroRecords: "No se encontraron resultados",
                            infoFiltered: "(filtrado de un total de _MAX_ registros)",
                            sSearch: "Buscar:",
                            oPaginate: {
                                sFirst: "Primero",
                                sLast: "Último",
                                sNext: "Siguiente",
                                sPrevious: "Anterior",
                            },
                            sProcessing: "Cargando...",
                        },
                    });
                }, 100);
            });
    } catch (error) {}
    addProdList;
    addProdList.toggle();
}
/* =============================Agregar producto========================================================= */
var productoAgregado = new bootstrap.Modal(
    document.getElementById("modalProductoAgregado"), { keyboard: false }
);

function agregar(cod_producto) {
    var datos = new URLSearchParams();
    datos.append("codigop", cod_producto);

    try {
        let tabla = document.getElementById("precio_prod");
        tabla.innerHTML = "";
        fetch("/consAddProd", {
                method: "post",
                body: datos,
            })
            .then((res) => res.json())
            .then((data) => {

                for (let i = 0; i < data.length; i++) {
                    document.getElementById('id_inventario').value = data[0].id_inventario;
                    let TipoUsuario = parseInt(document.getElementById("tusuario").value);
                    let tusuarioDOM;
                    let img = data[i].imagen;
                    console.log(img);


                    switch (TipoUsuario) {
                        case 1:
                            tusuarioDOM = data[i].aprendiz;
                            break;
                        case 2:
                            tusuarioDOM = data[i].instructor;
                            break;
                        case 3:
                            tusuarioDOM = data[i].administrativo;
                            break;
                        case 4:
                            tusuarioDOM = data[i].externo;
                            break;
                        case 5:
                            tusuarioDOM = data[i].auxiliar;
                            break;
                        default:
                            break;
                    }
                    /*======Elementos del modulo==== */
                    let labelNombre = document.createElement("label");
                    let labelprecio = document.createElement("label");
                    let lbTotal = document.createElement("label");
                    let divsub1 = document.createElement("div");
                    let divsub2 = document.createElement("div");
                    let divsub3 = document.createElement("div");
                    let divsub4 = document.createElement("div");
                    let inputCant = document.createElement("input");
                    let imgProd = document.createElement("img");

                    /* =====Atributos de los elementos=====*/
                    divsub1.setAttribute("class", "divsub1");
                    divsub2.setAttribute("class", "divsub2");
                    divsub3.setAttribute("class", "divsub3");
                    divsub4.setAttribute("class", "divsub4");
                    inputCant.setAttribute("class", "inputCant");
                    inputCant.setAttribute("id", "inputCant");
                    inputCant.setAttribute("placeholder", "Cantidad...");
                    inputCant.setAttribute("min", "0");
                    inputCant.setAttribute("max", "10");
                    inputCant.setAttribute("type", "number");
                    labelNombre.setAttribute("class", "lbNombre");
                    labelNombre.setAttribute("for", "inputCant");
                    labelprecio.setAttribute("class", "lbPrecio");
                    lbTotal.setAttribute("id", "lb-total");
                    imgProd.setAttribute('class', 'img-prod');
                    imgProd.setAttribute('src', 'img/products/' + img);


                    /* =====texto nodos======== */
                    let texto = document.createTextNode(data[i].Producto);
                    let texto2 = document.createTextNode("Unidad: $" + tusuarioDOM);
                    let totaltxt = document.createTextNode("");

                    /*=====Hijos de los nodos=====*/
                    tabla.appendChild(divsub1);
                    tabla.appendChild(divsub2);
                    tabla.appendChild(divsub3);
                    tabla.appendChild(divsub4);
                    divsub1.appendChild(labelNombre);
                    divsub2.appendChild(inputCant);
                    divsub2.appendChild(labelprecio);
                    divsub3.appendChild(imgProd);
                    divsub4.appendChild(lbTotal);
                    lbTotal.appendChild(totaltxt);
                    labelNombre.appendChild(texto);
                    labelprecio.appendChild(texto2);

                    /*Auto multiplicacion de la cantidad de producto*/
                    inputCant.addEventListener("change", sumar);
                    inputCant.addEventListener("keyup", sumar);

                    function sumar() {
                        let cantVlr = tusuarioDOM;
                        let cantProd = document.getElementById("inputCant").value;
                        var total = parseInt(cantVlr) * parseInt(cantProd);
                        if (Number.isNaN(cantProd.valueAsNumber)) {
                            cantProd.value = 0;
                        }
                        document.getElementById("lb-total").innerHTML = "$ " + total;
                        return total;
                    }
                }
            });
    } catch (error) {
        console.log("Error al listar los datos:" + error);
    }
    productoAgregado.toggle();
}

/* ===================buscar clientes================== */
document
    .getElementById("inputPIdCliente")
    .addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            buscarUser();
        }
    });

function buscarUser() {
    var iden = document.getElementById("inputPIdCliente").value;
    var datos = new URLSearchParams();
    datos.append("iden", iden);

    fetch("/filtro", {
            method: "post",
            body: datos,
        })
        .then((res) => res.json())
        .then((data) => {
            // AQUÍ LANZA EL MODAL PARA CREAR USUARIO============================
            if (data.length <= 0) {
                alert('Usuario no registraddo');
                document.getElementById("nombre").value = "Usuario no registrado.";
                document.getElementById("genVenDiv").innerHTML =
                    '<input type="button" class="btn btn-primary btndone" onclick="" value="Registrar Usuario?">';
                let btnProductos = document.getElementById("boton_agregar_productos");
                btnProductos.disabled = true;
                btnProductos.setAttribute('id', 'btn-deshabilitado');


            }

            /* ====VARIABLES===== */
            var identificacion = data[0].identificacion;
            var nombre = data[0].Nombres;
            var tusuario = data[0].Cargo;
            if (identificacion != iden) {
                document.getElementById("nombre").value = "Usuario no registrado.";
                document.getElementById("genVenDiv").innerHTML =
                    '<input type="button" class="btn btn-primary btndone" onclick="" value="Registrar Usuario?">';
                $("#tableAddProd").DataTable({
                    bInfo: false,
                    destroy: true,
                    language: {
                        decimal: ",",
                        thousands: ".",
                        lengthMenu: "Mostrar _MENU_ registros",
                        zeroRecords: "No se encontraron resultados",
                        infoFiltered: "(filtrado de un total de _MAX_ registros)",
                        sSearch: "Buscar:",
                        oPaginate: {
                            sFirst: "Primero",
                            sLast: "Último",
                            sNext: "Siguiente",
                            sPrevious: "Anterior",
                        },
                        sProcessing: "Cargando...",
                    },
                });
            } else if (identificacion == iden) {
                document.getElementById("nombre").value = nombre;
                document.getElementById("tusuario").value = tusuario;
                document.getElementById('divBtnAdd').innerHTML = '<input type="button" id="boton_agregar_productos" class="btn btn-primary btnadd" onclick="addProdVen();" value="Agregar Productos" />';

            }
            generarVenta(iden);


        })
        .catch((e) => console.log(e));
}
/* =========VENTA============ */
function eliminarProductoMovimiento(id) {
    var idenpPersona = document.getElementById('inputPIdCliente').value;
    var datos = new URLSearchParams();
    datos.append("idDetalle", id);
    fetch("/eliminarDetalle", {
            body: datos,
            method: "POST",
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.status == 200) {
                generarVenta(idenpPersona);
            }
        });
}

function generarVenta(ident) {
    var datos = new URLSearchParams();
    datos.append("iden", ident);

    fetch("/genventa", {
            method: "post",
            body: datos,
        })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById('id_movimiento').value = data[0].Id_movimiento;
            let productosMovimiento = [];
            let i = 1;
            data.forEach((producto) => {
                if (producto.id_detalle == null) return;
                let arrayProducto = {
                    num: i++,
                    nombre: producto.Nombre,
                    cantidad: producto.cantidad,
                    valor: producto.valor,
                    subtotal: producto.subtotal,
                    accion: `<button id='delBtn' onclick="eliminarProductoMovimiento('` +
                        producto.id_detalle +
                        `')">
                        <span class="icon-trash1"></span>
                    </button>`,
                };
                productosMovimiento.push(arrayProducto);
            });
            $("#tableCart").DataTable({
                destroy: true,
                searching: false,
                paging: false,
                bInfo: false,
                data: productosMovimiento,
                language: {
                    decimal: ",",
                    thousands: ".",
                    lengthMenu: "Mostrar _MENU_ registros",
                    zeroRecords: "No se encontraron resultados",
                    infoFiltered: "(filtrado de un total de _MAX_ registros)",
                    sSearch: "Buscar:",
                    oPaginate: {
                        sFirst: "Primero",
                        sLast: "Último",
                        sNext: "Siguiente",
                        sPrevious: "Anterior",
                    },
                    sProcessing: "Cargando...",
                },
                columns: [
                    { data: "num" },
                    { data: "nombre" },
                    { data: "cantidad" },
                    { data: "valor" },
                    { data: "subtotal" },
                    { data: "accion" },
                ],
            });
        })
        .catch((e) => console.log(e));
}
$("#tableCart").DataTable({
    destroy: true,
    searching: false,
    paging: false,
    bInfo: false,
    language: {
        decimal: ",",
        thousands: ".",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        sSearch: "Buscar:",
        oPaginate: {
            sFirst: "Primero",
            sLast: "Último",
            sNext: "Siguiente",
            sPrevious: "Anterior",
        },
        sProcessing: "Cargando...",
    },
});

function AregarProductoCliente() {
    let cantidad = document.getElementById('inputCant').value;
    let comprador = document.getElementById('inputPIdCliente').value;
    let movimiento = document.getElementById('id_movimiento').value;
    let inventario = document.getElementById('id_inventario').value;
    let cargoCod = document.getElementById('tusuario').value



    var datos = new URLSearchParams();
    datos.append('codCargo', cargoCod);
    datos.append("canProd", cantidad);
    datos.append("comprador", comprador);
    datos.append("movimiento", movimiento);
    datos.append("id_inventario", inventario);
    fetch('/agregarDetalle', {
            method: 'POST',
            body: datos
        }).then(res => res.json())
        .then(data => {
            Swal.fire({
                title: data.titulo,
                icon: data.icono,
                text: data.mensaje,
                timer: data.timer
            });

            if (data.status == 200) {
                generarVenta(comprador)
                productoAgregado.hide();
                addProdList.hide();
            } else {
                console.log(data)
            }
        }).catch(e => console.log(e))
}

var infoProductosPrecio = new bootstrap.Modal(document.getElementById("modalInfoProd"), {
    keyboard: false,
});
document.getElementById('ver-precios').addEventListener('click', (e) => {
    fetch('/listarPrecioProductos', {
            method: 'get'
        }).then(res => res.json())
        .then(data => {
            let infoProductos = []
            let arrayProducto = {}
            data.forEach(element => {
                arrayProducto = {
                    'codigo': element.codigo,
                    'nombre': element.Producto,
                    'stock': element.stock,
                    'aprendiz': element.aprendiz,
                    'instructor': element.instructor,
                    'admin': element.administrativo,
                    'externo': element.externo,
                    'auxiliar': element.auxiliar
                };
                infoProductos.push(arrayProducto);

                $("#tableInfoProducto").DataTable({
                    destroy: true,
                    data: infoProductos,
                    dom: 'Bfrtip',
                    language: {
                        decimal: ",",
                        thousands: ".",
                        lengthMenu: "Mostrar _MENU_ registros",
                        zeroRecords: "No se encontraron resultados",
                        infoFiltered: "(filtrado de un total de _MAX_ registros)",
                        sSearch: "Buscar:",
                        oPaginate: {
                            sFirst: "Primero",
                            sLast: "Último",
                            sNext: "Siguiente",
                            sPrevious: "Anterior",
                        },
                        sProcessing: "Cargando...",
                    },
                    columns: [
                        { data: "codigo" },
                        { data: "nombre" },
                        { data: "stock" },
                        { data: "aprendiz" },
                        { data: "instructor" },
                        { data: "admin" },
                        { data: "externo" },
                        { data: "auxiliar" },

                    ],
                });



            });
        }).catch((e) => console.log(e));
    infoProductosPrecio.toggle();
});
$('#inputPIdCliente').focus();