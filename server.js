var express = require('express');

var config = require('./server/configure');

var app = express();

// port setup
var puerto = process.env.PORT || 3000;
app.set('port', puerto);
app.set('views', __dirname + '/views');




// Cargamos la configuración
app= config(app);

 app.listen(puerto,function () {
console.log("Servidor operativo en puerto " + puerto);
 });

