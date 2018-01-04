var HomeController = require('../controllers/home');

module.exports = function(app){
    app.get('/', HomeController.index);
}