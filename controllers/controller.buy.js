let controllerBuy = {};
let productoCarrito = require('../public/js/productocart');

controllerBuy.addCart = (req, resp) => {
    resp.render('ventas', { productoCarrito });

}




module.exports = controllerBuy;