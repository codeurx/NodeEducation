var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/home');

/* Home Page Routes */
router.get('/', HomeController.index);

module.exports = router;
