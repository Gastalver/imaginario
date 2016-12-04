/**
 * Created by Miguel on 04/12/2016.
 */

module.exports = {
    index: function(req, res) {
        res.render('image');
    },
    create: function(req, res) {
        res.send('Image:create POST controller');
    },
    like: function(req, res) {
        res.send('Image:like POST controller');
    },
    comment: function(req, res) {
        res.send('Image:comment POST controller');
    }
};