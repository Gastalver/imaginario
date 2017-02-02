var express = require('express');

// Archivo de configuración separado, para organizar mejor.
var config = require('./server/configure');

var app = express();

var mongoose = require('mongoose');



// port setup
var puerto = process.env.PORT || 3000;
app.set('port', puerto);
app.set('views', __dirname + '/views');




// Cargamos la configuración
app= config(app);

// Conectamos con la base de datos y dejamos la conexión abierta.
mongoose.connect('mongodb://localhost/imgPloadr');
mongoose.connection.on('open', function() {
 console.log('Mongoose connected.');
});

 app.listen(puerto,function () {
console.log("Servidor operativo en puerto " + puerto);
 });

