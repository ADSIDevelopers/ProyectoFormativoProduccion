$(document).ready(function() {
    $('#tableDetalle').DataTable({
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
    newVenta;
    newVenta.toggle();
}
var addProd = new bootstrap.Modal(document.getElementById('modalAddProd'), { keyboard: false });

function addProdVen() {
    addProd;
    addProd.toggle();
}






function listarUser() {
    fetch('/listarVentas', {
        method: 'get',

    }).then(res => res.json()).then(data => {

        let html = " ";
        for (let i = 0; i < data.length; i++) {

            html += '<tr><td>' + data[i].Id_compra + '</td>';
            html += '<td scope="row">' + data[i].Nombres + '</td>';
            html += '<td>' + data[i].Fecha + '</td>';
            html += '<td>' + data[i].valor + '</td>';
            html += '<td>' + data[i].tipo + '</td>';
            html += '<td>' + data[i].Estado + '</td>';
            html += '<td class="action-td"><a href=javascript:mostrarDetalle(' + data[i].Id_compra + ')>Detalle</a></td>';
            html += '<td><a href=javascript:compranueva(' + data[i].Id_compra + ')>Facturar</a></td>';
            html += '</tr>';
        }
        document.getElementById('cuerpo-tabla').innerHTML = html;
    });
}
listarUser();

var detalle = new bootstrap.Modal(document.getElementById('modalDetalle'), { keyboard: false });

function mostrarDetalle() {
    fetch('/listarVentas', {
        method: 'get',

    }).then(res => res.json()).then(data => {

        let html = " ";
        for (let i = 0; i < data.length; i++) {

            html += '<tr><td>' + data[i].Id_compra + '</td>';
            html += '<td scope="row">' + data[i].Nombres + '</td>';
            html += '<td>' + data[i].Fecha + '</td>';
            html += '<td>' + data[i].valor + '</td>';
            html += '<td>' + data[i].tipo + '</td>';
            html += '<td>' + data[i].Estado + '</td>';
            html += '<td class="action-td"><a href=javascript:mostrarDetalle(' + data[i].Id_compra + ')>Detalle</a></td>';
            html += '<td><a href=javascript:compranueva(' + data[i].Id_compra + ')>Facturar</a></td>';
            html += '</tr>';
        }
        document.getElementById('cuerpo-tabla').innerHTML = html;
    });



    detalle;
    detalle.toggle();
}