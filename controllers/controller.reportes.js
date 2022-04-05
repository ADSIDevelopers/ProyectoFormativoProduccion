let controllerReportes = {}

controllerReportes.listarReportes = (req, resp) => {
    resp.render('admin/reportes');
}

module.exports = controllerReportes;