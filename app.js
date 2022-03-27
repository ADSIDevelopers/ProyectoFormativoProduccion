let express = require('express');
let servidor = express();
let bodyparser = require('body-parser');

servidor.use(express.static(__dirname + '/public'));
servidor.use(bodyparser.json());
servidor.use(bodyparser.urlencoded({ extended: false }));
servidor.set('view engine', 'ejs');
servidor.set('views', __dirname + '/views');

servidor.use(require('./routes/route.index'));
servidor.use(require('./routes/route.buy'));

servidor.listen(3000, () => {
    console.log('Servidor 3000 activo.')
});