var models  = require('../models');
exports.index = (req, res, next) => {
    models.User.findAll().then(function(users) {
        res.render('index', {
          title: 'Home Page',
          users: users
        });
      });
}