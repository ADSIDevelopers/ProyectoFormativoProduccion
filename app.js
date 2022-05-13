let express = require('express');
let servidor = express();
let bodyparser = require('body-parser');
let storage = require('node-sessionstorage');

let token = storage.getItem('token');
if (token) console.log(token)

servidor.use(express.static(__dirname + '/public'));
servidor.use(bodyparser.json());
servidor.use(bodyparser.urlencoded({ extended: false }));
servidor.set('view engine', 'ejs');
servidor.set('views', __dirname + '/views');

servidor.use(require('./routes/route.index'));
servidor.use('/auth', require('./routes/route.auth'));
servidor.use(require('./routes/route.movimientos'));


servidor.listen(3000, () => {
    console.log('Servidor 3000 activo.')
});