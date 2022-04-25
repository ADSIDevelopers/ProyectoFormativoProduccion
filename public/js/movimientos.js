$(document).ready(function() {
    $('#tableMovimientos').DataTable({

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
                let deleteProd = document.createElement('a');
                let btnFacturar = document.createElement('a');

                //Textos de los datos de la tabla
                let idMovRow = document.createTextNode(data[i].Id_movimiento);
                let clienteRow = document.createTextNode(data[i].personas);
                let fechaRow = document.createTextNode(data[i].Fecha);
                let totalRow = document.createTextNode(data[i].total);
                let estadoRow = document.createTextNode(data[i].Estado);
                let detalleTxt = document.createTextNode('Detalle');
                let facturaTxt = document.createTextNode('Facturar');

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
        });
    } catch (error) {
        console.log('Error al listar los movimientos: ' + error);
    }
}





var detalle = new bootstrap.Modal(document.getElementById('modalDetalle'), { keyboard: false });

function mostrarDetalle() {
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



var addProd = new bootstrap.Modal(document.getElementById('modalAddProd'), { keyboard: false });

function addProdVen() {
    try {
        fetch('/addProd', {
            method: 'get'
        }).then(res => res.json()).then(data => {

            for (let i = 0; i < data.length; i++) {
                let tableAddprod = document.getElementById('tableAddProd');

                let col1 = document.createElement('tr');
                let row1 = document.createElement('td');
                let row2 = document.createElement('td');
                let row3 = document.createElement('td');
                let row4 = document.createElement('td');
                let row5 = document.createElement('td');
                let row6 = document.createElement('td');
                let deleteProd = document.createElement('a');


                //Textos de los datos de la tabla
                let codigoPdto = document.createTextNode(data[i].Codigo_pdto);
                let nombreProd = document.createTextNode(data[i].NombreProd);
                let precioProd = document.createTextNode(data[i].Precio);
                let upProd = document.createElement(data[i].UPRod);
                let totalProd = document.createTextNode('Total');
                let addBtn = document.createTextNode('Agregar');

                //Atributos de los td
                row1.setAttribute('scope', 'row');
                row2.setAttribute('scope', 'row');
                row3.setAttribute('scope', 'row');
                row4.setAttribute('scope', 'row');
                row5.setAttribute('scope', 'row');
                row6.setAttribute('scope', 'row');
                deleteProd.setAttribute("id", 'add-btn');
                deleteProd.setAttribute("class", 'add-btn');
                deleteProd.setAttribute('onclick', mostrarDetalle);



                //Padre de los elementos de la tabla
                tableAddprod.appendChild(col1);
                col1.appendChild(row1);
                col1.appendChild(row2);
                col1.appendChild(row3);
                col1.appendChild(row4);
                col1.appendChild(row5);
                col1.appendChild(row6);
                row1.appendChild(codigoPdto);
                row2.appendChild(nombreProd);
                row3.appendChild(precioProd);
                row4.appendChild(upProd)
                row5.appendChild(totalProd);
                row6.appendChild(deleteProd);
                deleteProd.appendChild(addBtn);
            }
        });
    } catch (error) {}
    addProd;
    addProd.toggle();
}