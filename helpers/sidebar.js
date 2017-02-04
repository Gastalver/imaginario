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

var Stats = require('./stats');
var Images = require('./images');
var Comments = require('./comments');

module.exports = function(viewModel, callback){
    viewModel.sidebar = {
        stats: Stats(),
        popular: Images.popular(),
        comments: Comments.newest()
    };
    callback(viewModel);
};