/**
 * Created by Miguel on 04/12/2016.
 */
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
        var viewModel = {
            image: {
                uniqueId: 1,
                title: 'titulo',
                description: 'descripcion',
                filename: req.params.image_id,
                views: 0,
                likes: 0,
                timestamp: Date.now()
            },
            comments: [
                {
                    image_id: 1,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/1',
                    comment: 'This is a test comment...',
                    timestamp: Date.now()
                },{
                    image_id: 1,
                    email: 'test@testing.com',
                    name: 'Test Tester',
                    gravatar: 'http://lorempixel.com/75/75/animals/2',
                    comment: 'Another followup comment!',
                    timestamp: Date.now()
                }
            ]
        };
        res.render('image', viewModel);
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
        res.send('Image:like POST controller');
    },
    comment: function(req, res) {
        res.send('Image:comment POST controller');
    }
};