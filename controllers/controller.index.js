let controllerIndex = {};

controllerIndex.renderIndex = (req, resp) => {
    resp.render('index');
}
controllerIndex.adminIndex = (req, resp) => {
    resp.render('admin/index', /* {profile: req.session} */);
}
controllerIndex.perfil = (req, resp) => {
    console.log(req.session)
    resp.render('admin/perfil', {profile: req.session});
}

module.exports = controllerIndex;