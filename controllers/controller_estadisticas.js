let controllerEstadisticas = {}

controllerEstadisticas.renderEstadisticas =(req, resp)=>{
    resp.render('admin/estadisticas');
}

module.exports = controllerEstadisticas;
