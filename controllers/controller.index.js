let controllerIndex = {};

controllerIndex.renderIndex = (req, resp) => {
    resp.render('index');
}
controllerIndex.adminIndex = (req, resp) => {
    resp.render('admin/index', /* {profile: req.session} */);
}
controllerIndex.perfil = (req, resp) => {
    resp.render('admin/perfil');
}
controllerIndex.usuarios = (req, resp) => {
    resp.render('admin/usuarios')
}
controllerIndex.adminProduccion = (req, resp) => {
    resp.render('admin/produccion')
}
controllerIndex.productos = (req, resp) => {
    resp.render('admin/productos')
}
controllerIndex.unidadesproductivas = (req, resp) =>{
    resp.render('admin/unidadesproductivas')
}
controllerIndex.puntoventa = (req, resp) =>{
    resp.render('admin/puntoventa')
}
controllerIndex.inventario = (req, resp) =>{
    resp.render('admin/inventario')
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