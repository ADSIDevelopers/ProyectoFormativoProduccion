const controlador = {};

controlador.renderizarFrmReservas = (req, res) => {
    res.render("reservas.ejs");
}

module.exports = controlador;