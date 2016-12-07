/**
 * Created by Miguel on 04/12/2016.
 */

var fs = require('fs');
var path = require('path');
var multer = require('multer');
var upload = multer({dest: path.join(__dirname,'public/upload/temp')}).single('imagen');

module.exports = {
    index: function(req, res) {
        var viewModel = {
            image: {
                uniqueId: 1,
                title: 'Sample Image 1',
                description: 'This is a sample.',
                filename: 'sample1.jpg',
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
    create: function(req, res) { // todo: multer no carga el archivo en req.file
        upload(req, res, function (err) {
            if (err) {
                console.log("ALgo va mal :"+error);
                return;
            }

            console.log(req.file.name);

            res.status(200).send("Multer funciona");
        })
    },
    like: function(req, res) {
        res.send('Image:like POST controller');
    },
    comment: function(req, res) {
        res.send('Image:comment POST controller');
    }
};