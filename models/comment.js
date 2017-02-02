/**
 * Created by Miguel on 2/02/17.
 * Creación del modelo Comment.
 * Mongoose creará automáticamente una coleccion llamada igual pero en plural.
 */

// Dependencias
var mongoose = require('mongoose');
var  Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; //?

// Usamos image_id para establecer la RELACIÓN entre la colección Comentarios y la colección Imágenes.
var CommentSchema = new Schema({
    image_id: { type: ObjectId },
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment: { type: String },
    timestamp: { type: Date, 'default': Date.now }
});

// Creamos una propiedad virtual con setter y getter para añadir el objeto imagen a cada comentario.
CommentSchema.virtual('image')
    .set(function(image){
        this._image = image;
    })
    .get(function() {
         return this._image;
    });

module.exports = mongoose.model('Comment', CommentSchema);