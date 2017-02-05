/**
 * Created by Miguel on 2/02/17.
 */

/*We first required a module for each section
of the sidebar. The existing viewModel for any given page that displays the sidebar
is the first parameter of the function. We add a sidebar property to viewModel and
set values for each property by calling the module for each section of the sidebar.
    Finally, we execute a callback that was passed in as the second parameter to the
sidebar module. This callback is an anonymous function that we will use to execute
the rendering of the HTML page.*/

/* OJO, como hemos usado async en los helpers (en comments y en stats) y se ha vuelto asyncrono,
* hemos de incluir también aquí asýnc, para que gestione la asyncronicidad. Usaremos
* otra utilidad de async, PARALLEL. Ejecuta los tres helpers y pasa el conjunto de
* errores y resultados (results) como un array, que manipulamos. En esta caso añadimos los resultados
* de los tres helpers a la propiedad sidebar del view model dado. Al renderizar el viewmodel podremos usar
* viewmodel.images y viewmodel.sidebar (que incluye viewmodel.sidebar.stats, viewmodel.sidebar.popular y
  * viewmodel.sidebar.comments).
* */

var Stats = require('./stats');
var Images = require('./images');
var Comments = require('./comments');
var async = require('async');

module.exports = function(viewModel, callback){
    async.parallel(
        [
        function(next) {
            Stats(next);
        },
        function(next) {
            Images.popular(next);
        },
        function(next) {
            Comments.newest(next);
        }
        ],
        function(err, results){
            viewModel.sidebar = {
                stats: results[0],
                popular: results[1],
                comments: results[2]
        };
            callback(viewModel);
    });
};