/**
 * Created by Miguel on 2/02/17.
 */

/*The index.js file within any folder in Node.js acts as an index file for
  the modules within it. This is by convention, so you don't have to adhere to this
  if you don't want to.
  Luego es posible incluir los modulos exportados de una sola vez requiriendo este archivo indice.
  Now, thanks to this basic file, we can perform require('./models') anywhere in our
  application and know that we have a dictionary of each of our models via that
  module. To reference a specific model in that module, we simply refer to the specific
  model as a property of the module. If we only wanted to require a specific model
  somewhere in our app instead, we can perform require('./models/image') just
  as easily!*/

    module.exports = {
        'Image': require('./image'),
        'Comment': require('./comment')
    };