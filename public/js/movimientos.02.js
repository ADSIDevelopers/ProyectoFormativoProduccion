var facturar = new bootstrap.Modal(document.getElementById('modalFacturar'), { keyboard: false });

function compranueva() {
    facturar;
    facturar.toggle();
}

var newVenta = new bootstrap.Modal(document.getElementById('modalNewVenta'), { keyboard: false });

function nuevaVenta() {
    newVenta.toggle();
}
window.onload = lidarMovimientos;

function lidarMovimientos() {
    try {
        fetch('/listarMovimientos', {
            method: 'get'
        }).then(res => res.json()).then(data => {
            let tableMov = document.getElementById('cuerpo-tabla');
            tableMov.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                let col1 = document.createElement('tr');
                let row1 = document.createElement('td');
                let row2 = document.createElement('td');
                let row3 = document.createElement('td');
                let row4 = document.createElement('td');
                let row5 = document.createElement('td');
                let row6 = document.createElement('td');
                let row7 = document.createElement('td');

                //Textos de los datos de la tabla
                let idMovRow = document.createTextNode(data[i].Id_movimiento);
                let clienteRow = document.createTextNode(data[i].personas);
                let fechaRow = document.createTextNode(data[i].Fecha);
                let totalRow = document.createTextNode(data[i].total);
                let estadoRow = document.createTextNode(data[i].Estado);
                /* ==========================detalle venta===================================== */
                if (data[i].detalles > 0) {
                    row6.innerHTML = "<a class='detalle' href= 'javascript:mostrarDetalle(" + data[i].Id_movimiento + ");'><i class='icon-bookmark-outline'></i>Facturar</a>";
                }
                row7.innerHTML = "<a class='print' href='javascript:Facturar(" + data[i].Id_movimiento + ")'><i class='icon-file-pdf-o' style='display:none'></i></a>"
                if (data[i].Estado == 'Facturado') {
                    row7.innerHTML = "<a class='print' href='javascript:Facturar(" + data[i].Id_movimiento + ")'><i class='icon-file-pdf-o' style='display:block'></i></a>"
                }
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
                col1.appendChild(row7);
                row1.appendChild(idMovRow);
                row2.appendChild(clienteRow);
                row3.appendChild(fechaRow);
                row4.appendChild(totalRow);
                row5.appendChild(estadoRow);
            }
            $("#lista").DataTable({
                destroy: true,
                bInfo: false,
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

        });
    } catch (error) {
        console.log('Error al listar los movimientos: ' + error);
    }
}
/* ============================detalle de la venta=================================== */
var detalleModal = new bootstrap.Modal(document.getElementById('modalDetalle'), { keyboard: false });

function listarDetalle(Id_movimiento) {
    var datos = new URLSearchParams();
    datos.append("idcodigo", Id_movimiento);
    var total = 0;
    let tabla = document.getElementById('cuerpo-detalle');
    tabla.innerHTML = ''
    fetch('/listarDetalle/' + Id_movimiento, {
            method: 'get'
        }).then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                /* =============================cuerpo de la tabla detalles del producto============================ */

                let fila = document.createElement('tr');
                let idProducto = document.createElement('td');
                let nombreProducto = document.createElement('td');
                let cantidad = document.createElement('td');
                let valorUnitario = document.createElement('td');
                let valorTotal = document.createElement('td');
                let estadoEntrega = document.createElement('td');
                var eidtar = document.createElement('td');
                var eliminar = document.createElement('td');
                eidtar.innerHTML = "<a class='factura' href= 'javascript:modalEditar(" + data[i].id_detalle + ");'><i class='icon-edit-pencil'></i></a>";
                eliminar.innerHTML = "<a class='delate' href= 'javascript:eliminar(" + data[i].id_detalle + ");'><i class='icon-close-solid'></i></a>";

                //==============Datos de la   tabla====================
                let idPro = document.createTextNode(data[i].Codigo_pdto);
                let NombreP = document.createTextNode(data[i].Nombre);
                let cantidadp = document.createTextNode(data[i].Cantidad);
                let Valoru = document.createTextNode(data[i].VlrUnit);
                let ValorT = document.createTextNode(data[i].VlrTotal);
                total = total + parseInt(data[i].VlrTotal);

                document.getElementById('total').innerHTML = total;

                let EstadoE = document.createTextNode(data[i].EstadoVenta);


                /* hijos de latabla */
                tabla.appendChild(fila);
                fila.appendChild(idProducto);
                fila.appendChild(nombreProducto);
                fila.appendChild(cantidad);
                fila.appendChild(valorUnitario);
                fila.appendChild(valorTotal);
                fila.appendChild(estadoEntrega);
                fila.appendChild(eidtar);
                fila.appendChild(eliminar);
                /* ========hijos de la tabla en datos */
                idProducto.appendChild(idPro);
                nombreProducto.appendChild(NombreP);
                cantidad.appendChild(cantidadp);
                valorUnitario.appendChild(Valoru);
                valorTotal.appendChild(ValorT);
                estadoEntrega.appendChild(EstadoE);
            }
        });
}

function mostrarDetalle(Id_movimiento) {
    document.getElementById('id-movimiento').value = Id_movimiento;
    listarDetalle(Id_movimiento)
    detalleModal.show();
}
var modaleditar = new bootstrap.Modal(document.getElementById('modaleditar'), { keyboard: false });

function editarReserva() {
    modaleditar;
    modaleditar.toggle();
}
/* ===================modal editar============ */
function modalEditar(id_detalle) {
    var datos = new URLSearchParams();
    datos.append('Codigo_pdto', id_detalle);
    modaleditar.show();
    fetch('/botoneditar', {
            method: 'post',
            body: datos
        }).then(res => res.json())
        .then(data => {
            document.getElementById('NombrePDT').value = data.nombre;
            document.getElementById('cantidad').value = data.cantidad;
            document.getElementById('estado').value = data.estadetalle;
            document.getElementById('ID_detalle').value = data.id_detalle;
        });

}
/* ===============Editar================== */
function EditarDetalle() {
    var codigo_pdto = document.getElementById('ID_detalle').value;
    var cantidad = document.getElementById('cantidad').value;
    var estado = document.getElementById('estado').value;

    /* =====url datos==================================0 */
    var datos = new URLSearchParams();
    datos.append('codigo_pdto', codigo_pdto);
    datos.append('cantidad', cantidad);
    datos.append('estado', estado);

    fetch("/editar", {
            method: 'post',
            body: datos
        }).then(res => res.json())
        .then(data => {
            let id_movimiento = document.getElementById('id-movimiento').value;
            listarDetalle(id_movimiento)
        })
    modaleditar.toggle();
}
/* ===============finalizar la compra */
function finalizarCompra() {
    var detalle = document.getElementById('id-movimiento').value;
    var datos = new URLSearchParams();
    datos.append('IDdetalle', detalle);
    fetch("/endCompra", {
            method: 'post',
            body: datos
        }).then(res => res.json())
        .then(() => {
            lidarMovimientos();
            detalleModal.hide();
        })


}

function alertF() {
    swealerFinalizarCompra()
}
/*===================== swealer============================== */
function swealerFinalizarCompra() {
    Swal.fire({
        title: 'Seguro quieres finalizar la compra??',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '<a  onclick="finalizarCompra();">Confirmar Compra</a>',
        denyButtonText: `Cancelar Compra`,


    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: '    Compra Confirmada',
                showConfirmButton: false,
                timer: 1000
            })

        } else if (result.isDenied) {
            Swal.fire({
                icon: 'info',
                title: 'Compra Celada',
                showConfirmButton: false,
                timer: 1000,

            })

        }

    })
}