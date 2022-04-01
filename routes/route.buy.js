let express = require('express');
const { route } = require('express/lib/application');
let routeBuy = express.Router();
let contBuy = require('../controllers/controller.buy');


routeBuy.get('/cart', contBuy.addCart);


module.exports = routeBuy;