var exports = module.exports = {}
var models  = require('../models');
exports.index = (req, res, next) => {
    models.user.findAll().then(function(users) {
        res.render('public/index', {
          title: 'Home Page',
          users: users
        });
      });
}