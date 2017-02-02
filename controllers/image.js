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
                res.redirect('/images/' + req.file.filename);
            }
        })
    },
    like: function(req, res) {
        res.json({likes: 1});
    },
    comment: function(req, res) {
        res.send('Image:comment POST controller');
    }
};