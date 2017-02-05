/**
 * Created by Miguel on 2/02/17.
 * Usaremos el modulo async, que es un poco complejo.
 * Ver doc. de ASYNC en http://caolan.github.io/async/
 */

var models = require('../models');
var async = require('async');

module.exports = {
    // El modelo exporta una función newest que acepta como parametro una función callback.
    newest: function(callback) {

        // Buscamos los ultimos cinco comentarios ordenados por antiguedad.
        models.Comment.find({}, {}, { limit: 5, sort: { 'timestamp': -1 } }, function(err, comments){

            // Definimos una función auxiliar para añadir la imagen a cada comentario.
            var attachImage = function(comment, next) {
                models.Image.findOne({ _id : comment.image_id},function(err, image) {
                    if (err) throw err;
                    comment.image = image;
                    next(err);
                });
            };

            // Usamos async.EACH para iterar el array de resultados y aplicarle la función auxiliar.
            // Los parametros del callback serán el conjunto de errores y comentarios resultantes
            async.each(comments, attachImage,function(err) {
                if (err) throw err;
                callback(err, comments);
            });
        });
    }
};