let controllerIndex = {};


controllerIndex.autenticar = (req, res) => {
    res.send('autenticar');
}
controllerIndex.renderIndex = (req, resp) => {
    resp.render('index');
}
controllerIndex.adminIndex = (req, resp) => {
    resp.render('admin/index');
}
controllerIndex.usuarios = (req, resp) => {
    resp.render('admin/usuarios')
}
controllerIndex.adminProduccion = (req, resp) => {
    resp.render('admin/produccion')
}
controllerIndex.store = (req, resp) => {
    resp.render('store');
}
controllerIndex.buy = (req, resp) => {
    resp.render('buy');
}
controllerIndex.uds = (req, resp) => {
    resp.render('uds');
}
controllerIndex.ud = (req, resp) => {
    resp.render('ud');
}
controllerIndex.adminVentas = (req, resp) => {
    resp.render('admin/adminVentas');
}
controllerIndex.venta = (req, resp) => {
    resp.render('ventas');
}


controllerIndex.listarVentas = (req, resp) => {
    resp.render('admin/listarVentas');
}




controllerIndex.unidadesproductivas = (req, resp) => {
    resp.render('admin/UnidadesProductivas')
}
controllerIndex.store = (req, res) => {
    res.render('store');
}
controllerIndex.inventario = (req, resp) => {
    resp.render('admin/inventario')
}
controllerIndex.productos = (req, resp) => {
    resp.render('admin/productos')
}
controllerIndex.puntoventa = (req, resp) => {
    resp.render('admin/puntoventa')
}

controllerIndex.registroClientes = (req, res) => {
    res.render('admin/registroClientes');
}

module.exports = controllerIndex;