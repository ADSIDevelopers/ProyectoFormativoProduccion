let controladorVenta = {}

controladorVenta.renderVenta = (req, resp) => {
    resp.render('admin/ventas');
}

module.exports = controladorVenta;