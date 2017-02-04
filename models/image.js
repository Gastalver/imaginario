/**
 * Created by Miguel on 2/02/17.
 */

// Dependencias
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var path = require('path');

// Schema
var ImageSchema = new Schema({
    title : {type: String},
    description : {type: String},
    filename : {type: String},
    views: {type: Number, 'default': 0},
    likes: {type: Number, 'default': 0},
    timestamp: {type: Date, 'default': Date.now()}
});

ImageSchema.virtual('uniqueID')
    .get(function(){
        return this.filename.replace(path.extname(this.filename),'');
    });

module.exports = mongoose.model('Image', ImageSchema);