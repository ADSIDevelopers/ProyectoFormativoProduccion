$(document).ready(function() {


    $('#tableFacturar').DataTable({
        "destroy": true,
        "processing": true,
        "responsive": true,

        bFilter: false,
        language: {
            "decimal": ",",
            "thousands": ".",
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Cargando..."
        }

    });


    $("#modalDetalle").on('hidden.bs.modal', function() {
        document.getElementById('contDet').innerHTML = "";
        alert("Modal Cerrado");
    });

    $("#modalNewVenta").on('hidden.bs.modal', function() {
        document.getElementById('inputPIdCliente').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('tusuario').value = "";
        document.getElementById('add-prod').innerHTML = "";



    });
});

var facturar = new bootstrap.Modal(document.getElementById('modalFacturar'), { keyboard: false });

function compranueva() {
    facturar;
    facturar.toggle();
}

var newVenta = new bootstrap.Modal(document.getElementById('modalNewVenta'), { keyboard: false });

function nuevaVenta() {
    newVenta.toggle();
}
window.onload = listarUser;


function listarUser() {
    try {
        fetch('/listarMovimientos', {
            method: 'get'
        }).then(res => res.json()).then(data => {
            for (let i = 0; i < data.length; i++) {
                let tableMov = document.getElementById('cuerpo-tabla');

                let col1 = document.createElement('tr');
                let row1 = document.createElement('td');
                let row2 = document.createElement('td');
                let row3 = document.createElement('td');
                let row4 = document.createElement('td');
                let row5 = document.createElement('td');
                let row6 = document.createElement('td');
                let deleteProd = document.createElement('td');
                //Textos de los datos de la tabla
                let idMovRow = document.createTextNode(data[i].Id_movimiento);
                let clienteRow = document.createTextNode(data[i].personas);
                let fechaRow = document.createTextNode(data[i].Fecha);
                let totalRow = document.createTextNode(data[i].total);
                let estadoRow = document.createTextNode(data[i].Estado);
                /* ==========================detalle venta===================================== */
                deleteProd.innerHTML = "<a class='factBtn' href= 'javascript:mostrarDetalle(" + data[i].Id_movimiento + ");'><i class='fas fa-user-edit'></i>Facturar</a>"
                console.log(deleteProd);
                //Atributos de los td
                row2.setAttribute('scope', 'row');



                //Padre de los elementos de la tabla
                tableMov.appendChild(col1);
                col1.appendChild(row1);
                col1.appendChild(row2);
                col1.appendChild(row3);
                col1.appendChild(row4);
                col1.appendChild(row5);
                col1.appendChild(row6);
                row1.appendChild(idMovRow);
                row2.appendChild(clienteRow);
                row3.appendChild(fechaRow);
                row4.appendChild(totalRow);
                row5.appendChild(estadoRow);
                row6.appendChild(deleteProd);
            }
        });

    } catch (error) {
        console.log('Error al listar los movimientos: ' + error);
    }
}



var detalle = new bootstrap.Modal(document.getElementById('modalDetalle'), { keyboard: false });

function mostrarDetalle(Id_movimiento) {
    detalle.toggle();
    console.log(Id_movimiento);
    var datos = new URLSearchParams();
    datos.append('idcodigo', Id_movimiento);
    try {
        let tabla = document.getElementById('cuerpo-detalle');
        let mainTabla = document.getElementById('contDet');

        tabla.innerHTML = '';
        fetch('/listarDetalle', {
            method: 'post',
            body: datos
        }).then(res => res.json()).then(data => {
            for (let i = 0; i < data.length; i++) {
                /* =============================cuerpo de la tabla detalles del producto============================ */


                let fila = document.createElement('tr');
                let idProducto = document.createElement('td');
                let nombreProducto = document.createElement('td');
                let cantidad = document.createElement('td');
                let valorUnitario = document.createElement('td');
                let valorTotal = document.createElement('td');
                let estadoEntrega = document.createElement('td');
                let contDatosClient = document.createElement('td');
                let nombreCliente = document.createElement('label');

                contDatosClient.setAttribute('id', 'divDatosClente');
                req.body
                    //==============Datos de la   tabla
                let idPro = document.createTextNode(data[i].Codigo_pdto);
                let NombreP = document.createTextNode(data[i].Nombre);
                let cantidadp = document.createTextNode(data[i].Cantidad);
                let Valoru = document.createTextNode(data[i].VlrUnit);
                let ValorT = document.createTextNode(data[i].VlrTotal);
                let EstadoE = document.createTextNode(data[i].EstadoVenta);
                // let cliente = document.createTextNode("Nombre del Cliente: " + data[i].NombrePer);
                /* hijos de latabla */
                tabla.appendChild(fila);
                fila.appendChild(idProducto);
                fila.appendChild(nombreProducto);
                fila.appendChild(cantidad);
                fila.appendChild(valorUnitario);
                fila.appendChild(valorTotal);
                fila.appendChild(estadoEntrega);
                /* ========hijos de la tabla en datos */
                idProducto.appendChild(idPro);
                nombreProducto.appendChild(NombreP);
                cantidad.appendChild(cantidadp);
                valorUnitario.appendChild(Valoru);
                valorTotal.appendChild(ValorT);
                estadoEntrega.appendChild(EstadoE);
                mainTabla.appendChild(contDatosClient);
                contDatosClient.appendChild(nombreCliente);
                // nombreCliente.appendChild(cliente);


            }

        });

    } catch (error) {
        console.log('Error al listar el detalle: ' + error);
    }

}




var addProdList = new bootstrap.Modal(document.getElementById('modalAddProd'), { keyboard: false });

function addProdVen() { //Tabla del modal donde agregaremos los productos a la venta
    let datos = new URLSearchParams();
    datos.append('idcodigo', tusuario);

    try {
        fetch('/addProd', {
            method: 'get'
        }).then(res => res.json()).then(data => {
            for (let i = 0; i < data.length; i++) {

                let TipoUsuario = parseInt(document.getElementById('tusuario').value);
                let tableAddprod = document.getElementById('add-prod');
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

                console.log("QWERTYUIOP " + tusuarioDOM);

                let col1 = document.createElement('tr');
                let row1 = document.createElement('td');
                let row2 = document.createElement('td');
                let row3 = document.createElement('td');
                let row4 = document.createElement('td');
                let row5 = document.createElement('td');



                //Textos de los datos de la tabla
                let codigoPdto = document.createTextNode(data[i].cod_producto);
                let nombreProd = document.createTextNode(data[i].Producto);
                let precioProd = document.createTextNode('$ ' + tusuarioDOM);
                let upProd = document.createTextNode(data[i].stock);
                row5.innerHTML = "<a href='javascript:agregar(" + data[i].cod_producto + ");'>Agregar</a>"





                //Atributos de los td
                row1.setAttribute('scope', 'row');
                row1.setAttribute('class', 'row1');
                row2.setAttribute('scope', 'row');
                row3.setAttribute('scope', 'row');
                row4.setAttribute('scope', 'row');
                row5.setAttribute('id', 'row5');
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
                row4.appendChild(upProd)
            }



            setTimeout(() => {
                $('#tableAddProd').DataTable({
                    "destroy": true,
                    "processing": true,
                    "responsive": true,
                    language: {
                        "decimal": ",",
                        "thousands": ".",
                        "lengthMenu": "Mostrar _MENU_ registros",
                        "zeroRecords": "No se encontraron resultados",
                        "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                        "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sSearch": "Buscar:",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "Último",
                            "sNext": "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "sProcessing": "Cargando..."
                    }
                });
            }, 100);
            $("#modalAddProd").on('hidden.bs.modal', function() {
                document.getElementById('add-prod').innerHTML = "";
                tablaMov.Destroy();
                alert("Modal Cerrado");
            });
        });
    } catch (error) {}
    addProdList;
    addProdList.toggle();
}
/* =============================Agregar producto========================================================= */
var productoAgregado = new bootstrap.Modal(document.getElementById('modalProductoAgregado'), { keyboard: false });

function agregar(cod_producto) {
    var datos = new URLSearchParams();
    datos.append('codigop', cod_producto);

    try {

        let tabla = document.getElementById('precio_prod');
        tabla.innerHTML = ''
        fetch('/consAddProd', {
            method: 'post',
            body: datos
        }).then(res => res.json()).then(data => {
            let datos = new URLSearchParams;

            for (let i = 0; i < data.length; i++) {

                let TipoUsuario = parseInt(document.getElementById('tusuario').value);
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

                console.log("QWERTYUIOP " + tusuarioDOM);

                /*======Elementos del modulo==== */
                let labelNombre = document.createElement('label');
                let labelprecio = document.createElement('label');
                let lbTotal = document.createElement('label');
                let divsub1 = document.createElement('div');
                let divsub2 = document.createElement('div');
                let divsub3 = document.createElement('div');
                let divsub4 = document.createElement('div');
                let inputCant = document.createElement('input');

                /* =====Atributos de los elementos=====*/
                divsub1.setAttribute('class', 'divsub1');
                divsub2.setAttribute('class', 'divsub2');
                divsub3.setAttribute('class', 'divsub3');
                divsub4.setAttribute('class', 'divsub4');
                inputCant.setAttribute('class', 'inputCant');
                inputCant.setAttribute('id', 'inputCant');
                inputCant.setAttribute('placeholder', 'Cantidad...')
                inputCant.setAttribute('min', '0');
                inputCant.setAttribute('max', '10');
                inputCant.setAttribute('type', 'number');
                labelNombre.setAttribute('class', 'lbNombre');
                labelNombre.setAttribute('for', 'inputCant');
                labelprecio.setAttribute('class', 'lbPrecio');
                lbTotal.setAttribute('id', 'lb-total');



                /* =====texto nodos======== */
                let texto = document.createTextNode(data[i].Producto);
                let texto2 = document.createTextNode('Unidad: $' + tusuarioDOM);
                let totaltxt = document.createTextNode('');


                /*=====Hijos de los nodos=====*/
                tabla.appendChild(divsub1);
                tabla.appendChild(divsub2);
                tabla.appendChild(divsub3);
                tabla.appendChild(divsub4);
                divsub1.appendChild(labelNombre);
                divsub2.appendChild(inputCant);
                divsub2.appendChild(labelprecio);
                divsub4.appendChild(lbTotal);
                lbTotal.appendChild(totaltxt);
                labelNombre.appendChild(texto);
                labelprecio.appendChild(texto2);


                /*Auto multiplicacion de la cantidad de producto*/
                inputCant.addEventListener('change', sumar);
                inputCant.addEventListener('keyup', sumar);

                function sumar() {
                    let cantVlr = tusuarioDOM;
                    let cantProd = document.getElementById('inputCant').value;
                    let total = (parseInt(cantVlr) * parseInt(cantProd));
                    if (Number.isNaN(cantProd.valueAsNumber)) {
                        cantProd.value = 0;

                    }
                    document.getElementById('lb-total').innerHTML = "$ " + total;



                }
            }


        });
    } catch (error) {
        console.log('Error al listar los datos:' + error);
    }
    productoAgregado;
    productoAgregado.toggle();
}


/* ===================buscar clientes================== */
document.getElementById('inputPIdCliente').addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        buscarUser();
    }

});

function buscarUser() {
    var iden = document.getElementById('inputPIdCliente').value;

    console.log(iden);
    var datos = new URLSearchParams();
    datos.append('iden', iden);

    try {
        fetch('/filtro', {
            method: 'post',
            body: datos
        }).then(res => res.json()).then(data => {
            var identificacion;
            var nombre;
            for (let i = 0; i < data.length; i++) {
                let numCargo = data[i].Cargo;
                identificacion = data[i].identificacion;
                nombre = data[i].Nombres;
                console.log(identificacion);

            }
            if (identificacion != iden) {
                document.getElementById('nombre').value = "Usuario no registrado.";
                document.getElementById('genVenDiv').innerHTML = '<input type="button" class="btn btn-primary btndone" onclick="" value="Registrar Usuario?">';

            } else if (identificacion == iden) {
                document.getElementById('nombre').value = nombre;
                document.getElementById('genVenDiv').innerHTML = '<input type="button" class="btn btn-primary btndone" onclick="genVenta();" value="Generar Venta">';

            }


        });
    } catch (error) {
        console.log('Error al listar los Usuario:' + error);
    }
}


function genVenta() {
    var datos = new URLSearchParams();
    try {

        fetch('/genventa', {
            method: 'post',
            body: datos
        }).then(res => res.json()).then(data => {

        });

        document.getElementById('')
    } catch (error) {

    }



}