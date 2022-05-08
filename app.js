let express = require('express');
let servidor = express();
let bodyparser = require('body-parser');
let storage = require('node-sessionstorage');

servidor.use(express.static(__dirname + '/public'));
servidor.use(bodyparser.json());
servidor.use(bodyparser.urlencoded({ extended: false }));
servidor.set('view engine', 'ejs');
servidor.set('views', __dirname + '/views');

servidor.use(require('./routes/route.views'));
servidor.use(require('./routes/route.reservas'))
servidor.use(require('./routes/route.cliente'));
servidor.use(require('./routes/route.gastronomia')); 
servidor.use('/auth', require('./routes/route.auth'));

servidor.listen(8080, () => {
    console.log('Servidor 8080 activo.')
});