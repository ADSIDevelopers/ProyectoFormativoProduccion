$(document).ready(function() {
    listarUser();



    $('#tableFacturar').DataTable({

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
    $('#tableCart').DataTable({

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
    $("#modalAddProd").on('hidden.bs.modal', function() {
        document.getElementById('add-prod').innerHTML = "";
        tablaMov.dataTable().fnDestroy();
        alert("Modal Cerrado");
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



function listarUser() { //Tabla de mivimientos
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
                let deleteProd = document.createElement('a');
                let btnFacturar = document.createElement('a');

                //Textos de los datos de la tabla
                let idMovRow = document.createTextNode(data[i].Id_movimiento);
                let clienteRow = document.createTextNode(data[i].personas);
                let fechaRow = document.createTextNode(data[i].Fecha);
                let totalRow = document.createTextNode(data[i].total);
                let estadoRow = document.createTextNode(data[i].Estado);
                let detalleTxt = document.createTextNode('FInalizar ');
                let facturaTxt = document.createTextNode('COmpra');
                modalAddProd
                //Atributos de los td
                row2.setAttribute('scope', 'row');
                deleteProd.setAttribute("id", 'detalle-btn');
                btnFacturar.setAttribute("id", 'fact-btn');

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
                row6.appendChild(btnFacturar);
                deleteProd.appendChild(detalleTxt);
                btnFacturar.appendChild(facturaTxt);
            }
            setTimeout(() => {
                let tablaMov = $('#tableMovimientos').DataTable({

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





        });
    } catch (error) {
        console.log('Error al listar los movimientos: ' + error);
    }
}





var detalle = new bootstrap.Modal(document.getElementById('modalDetalle'), { keyboard: false });

function mostrarDetalle() { //Tabla de detalle
    detalle.toggle();

    try {
        fetch('/listarDetalle', {
            method: 'post'
        }).then(res => res.json()).then(data => {


            for (let i = 0; i < data.length; i++) {

                let tableMov = document.getElementById('cuerpo-tabla');

                let IdDet = mostrarDetalle(data[i].Id_movimiento);
                let IdAct = mostrarDetalle(data[i].Id_movimiento);
                let col1 = document.createElement('tr');
                let row1 = document.createElement('td');
                let row2 = document.createElement('td');
                let row3 = document.createElement('td');
                let row4 = document.createElement('td');
                let row5 = document.createElement('td');
                let row6 = document.createElement('td');
                let deleteProd = document.createElement('a');
                let btnFacturar = document.createElement('a');



                //Textos de los datos de la tabla
                let CodProdRow = document.createTextNode(data[i].Codigo_pdto);
                let NomClientRow = document.createTextNode(data[i].Nombre);
                let CantRow = document.createTextNode(data[i].Cantidad);
                let VlrUnitRow = document.createTextNode(data[i].VlrUnit);
                let VlrTotalRow = document.createTextNode(data[i].VlrTotal);
                let estadoVentRow = document.createTextNode(data[i].EstadoVenta);


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
                row1.appendChild(CodProdRow);
                row2.appendChild(NomClientRow);
                row3.appendChild(CantRow);
                row4.appendChild(VlrUnitRow);
                row5.appendChild(VlrTotalRow);
                row6.appendChild(estadoVentRow);
            }
        });

    } catch (error) {
        console.log('Error al listar el detalle: ' + error);
    }
}



var addProdList = new bootstrap.Modal(document.getElementById('modalAddProd'), { keyboard: false });

function addProdVen() { //Tabla del modal donde agregaremos los productos a la venta
    try {
        fetch('/addProd', {
            method: 'get'
        }).then(res => res.json()).then(data => {

            for (let i = 0; i < data.length; i++) {
                let tableAddprod = document.getElementById('add-prod');

                let col1 = document.createElement('tr');
                let row1 = document.createElement('td');
                let row2 = document.createElement('td');
                let row3 = document.createElement('td');
                let row4 = document.createElement('td');
                let row5 = document.createElement('td');
                let agregar = document.createElement('a');

                //Textos de los datos de la tabla
                let codigoPdto = document.createTextNode(data[i].Codigo_pdto);
                let nombreProd = document.createTextNode(data[i].NombreProd);
                let precioProd = document.createTextNode(data[i].Precio);
                let upProd = document.createTextNode(data[i].UProd);
                let addBtn = document.createTextNode('Agregar');

                //Atributos de los td
                row1.setAttribute('scope', 'row');
                row1.setAttribute('class', 'row1');
                row2.setAttribute('scope', 'row');
                row3.setAttribute('scope', 'row');
                row4.setAttribute('scope', 'row');
                row5.setAttribute('id', 'row5');
                agregar.setAttribute("type", 'button');
                agregar.setAttribute('href', 'addProdVent(' + data[i].Codigo_pdto + ')');
                agregar.setAttribute("id", 'add-lk');
                agregar.setAttribute("class", 'add-lk');

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
                row5.appendChild(agregar);
                agregar.appendChild(addBtn);

                let codigoProd = data[i].Codigo_pdto;
                console.log(codigoProd);

            }

            setTimeout(() => {
                $('#tableAddProd').DataTable({
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
        });
    } catch (error) {}
    addProdList;
    addProdList.toggle();
}
var productoAgregado = new bootstrap.Modal(document.getElementById('modalProductoAgregado'), { keyboard: false });

function addProdVent() {
    try {
        fetch('/addProd', {
            method: 'get'
        }).then(res => res.json()).then(data => {




        });
        productoAgregado.toggle();
    } catch (error) {}



}