/**
 * Created by Miguel on 04/12/2016.
 */

// Primero hacemos disponibles los modelos que necesitamos para este controlador.
var ImageModel = require('../models').Image;
// Importamos además el modulo helper que añadira al viewmodel los datos del sidebar.
var sidebar = require('../helpers/sidebar');


module.exports = {
    index: function(req, res) {
        var viewModel = {
            images: []
        };
        ImageModel.find({},{},{sort:{timestamp: -1}},function(error,images){
            if(error) {throw error};
            //console.log("Encontradas "+images.length + " imágenes.");
            viewModel.images = images;
            console.log(viewModel);

            // Ejecutamos el res.render del viewmodel como callback del helper sidebar definido en ../helpers/sidebar.js
            sidebar(viewModel, function(viewModel) {
                //console.log(viewModel);
                res.render('index', viewModel);
        } );

        });
    }
};