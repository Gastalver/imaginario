/**
 * Created by Miguel on 04/12/2016.
 */
var Models = require('../models');
var sidebar = require('../helpers/sidebar');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var destino = path.parse(__dirname).dir + '/public/upload';
        cb(null,destino);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            req.invalidUpload = 'Archivo no admitido';
            return cb(null, false);
        }
        cb(null, true);
    }}).single('file');



module.exports = {
    index: function(req, res) {
        // Inicializamos el modelo
        var viewModel = {
            image: {},
            comments: []
        };
        // Consultamos la base de datos para cargar los datos en el apartado imagen del viewModel
        Models.Image.findOne({ filename: { $regex: req.params.image_id }},
            function(err, image) {
                if (err) { throw err; }
                if (image) {
                    image.views = image.views + 1;
                    viewModel.image = image;
                    image.save();
                    // A continuación consultamos la base de datos para cargar los datos en el apartado comments del viewModel
                    Models.Comment.find({ image_id: image._id}, {}, { sort: {'timestamp': 1 }},
                        function(err, comments){
                            if (err) { throw err; }
                            viewModel.comments = comments;
                            // Finalmente ejecutamos el modulo sidebar que añade al viewmodel los datos del sidebar
                            // y luego lo renderiza.
                            sidebar(viewModel, function(viewModel) {
                                res.render('image', viewModel);
                            });
                        }
                    );
                } else {
                    // Si no hay errores pero no hemos encontrado la imagen, redirigimos a la home page.
                    console.log("No hay errores pero el parametro image_id de la url (" + req.params.image_id + ") no coincide con el campo filename de ningun registro en la bd. Redirigiendo a home.");
                    res.redirect('/');
                }
            });
    },
    create: function (req, res) {

        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                console.log('Multer error:' + err);
                res.status(500).send('Internal Error');
                return;
            }
            // Everything went fine
            if (req.invalidUpload){
                console.log(req.invalidUpload);
                res.send(req.invalidUpload);

            } else {
                // Tenemos disponible toda esta información entre el objeto req.file que nos ofrece multer y el
                // objeto req.body que nos crea body-parser.
                console.log("El archivo ha sido subido");
                console.log("El nombre del campo de tipo archivo en el formulario es: " + req.file.fieldname);
                console.log("El titulo dado al archivo es " + req.body.title);
                console.log("Ha sido descrito como " + req.body.description);
                console.log("El nombre del archivo en el PC del cliente era " + req.file.originalname);
                console.log("El tipo de encoding del archivo subido es " + req.file.encoding);
                console.log("El mime/type del archivo subido es " + req.file.mimetype);
                console.log("El tamaño del archivo subido en bytes es " + req.file.size);
                console.log("El archivo ha sido guardado en la carpeta "+ req.file.destination);
                console.log("El archivo ha sido guardado con el nombre " + req.file.filename);
                console.log("Dirección para acceder al archivo: " + req.file.path);

                // Creamos un nuevo objeto a partir del modelo Imagen y lo guardamos en la bd.
                var newImg = new Models.Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: req.file.filename
                });
                 // Aquí podríamos llevar a cabo una validación del documento antes de grabarlo.
                newImg.validate(function(error){
                    if(error)
                        res.send("error de validación");
                    console.log("Validacion de mongo superada correctamente");
                });
                newImg.save(function(error,image){
                      //console.log("Archivo guardado correctamente. Redirigiendo a image/index");
                      // Redirigimos indicando como parametro el campo virtual uniqueId del modelo imagen.
                      res.redirect('/images/' + image.filename);
                    });
                }
        });
    },
    like: function(req, res) {
        res.json({likes: 1});
    },
    comment: function(req, res) {
        res.send('Image:comment POST controller');
    }
};