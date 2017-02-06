/**
 * Created by Miguel on 04/12/2016.
 */

var express, router, home, image,path,multer,upload;
express = require('express');
router = express.Router();
home = require('./controllers/home');
image = require('./controllers/image');
//path = require('path');
//multer = require('multer');
//upload = multer({dest: path.join(__dirname,'public/upload/temp')});

module.exports = function(app) {
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
    router.delete('/images/:image_id',image.remove);
    app.use(router);
};