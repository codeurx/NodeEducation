var models  = require('../models');
exports.index = (req, res, next) => {
    models.User.findAll().then(function(users) {
        res.render('public/index', {
          title: 'Home Page',
          users: users
        });
      });
}