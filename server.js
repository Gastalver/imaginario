var express = require('express');

var config = require('./server/configure');

var app = express();

// port setup
app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', __dirname + 'views');
//app.set('view engine', 'jade');

// Cargamos la configuración
app= config(app);

 app.listen(app.get('port'),function () {
console.log("Servidor operativo en puerto " + app.get('port'));
 });

