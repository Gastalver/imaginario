/**
 * Created by Miguel on 04/12/2016.
 * Dependencias de server.js y middleware por separado, por razones de orden.
 * Se cargan con la función exportada. Así, esto es un, digamos, módulo configurador.
 */

var path = require('path');
var routes = require('../routes');
var exphbs = require('express-handlebars');
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var moment = require('moment');
var errorHandler = require('errorhandler');

module.exports = function(app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended': true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('imaginario'));

    routes(app); // Antes de los estaticos.

    app.use('/public/', express.static(path.join(__dirname,'../public')));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    // view engine setup
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function(timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');

    return app;
};
