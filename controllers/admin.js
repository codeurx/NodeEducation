var models  = require('../models');
exports.index = (req, res, next) => {
    models.Admin.findAll().then(function(admins) {
        res.render('public/index', {
          title: 'Home Page',
          admins: admins
        });
      });
}