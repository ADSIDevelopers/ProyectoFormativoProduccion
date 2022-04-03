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
controllerIndex.unidadesproductivas = (req, resp) => {
    resp.render('admin/UnidadesProductivas')
}
controllerIndex.inventario = (req, resp) => {
    resp.render('admin/inventario')
}
controllerIndex.productos = (req, resp) => {
    resp.render('admin/productos')
}
controllerIndex.puntoventa = (req, resp) =>{
    resp.render('admin/puntoventa')
}
controllerIndex.store = (req, res) => {
    res.render('store');
}
controllerIndex.buy = (req, res) => {
    res.render('buy');
}
controllerIndex.uds = (req, res) => {
    res.render('uds');
}
controllerIndex.ud = (req, res) => {
    res.render('ud');
}
module.exports = controllerIndex;