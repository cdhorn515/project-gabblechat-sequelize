const express = require('express'),
      // models = require('./models'),
      // sequelize = require('sequelize'),
      userController = require('./controllers/user'),
      gabbleController = require('./controllers/gabble');

      // var router = express.Router();

module.exports = function(router) {

router.get('/', userController.index);

router.get('/signup', userController.landing);
router.post('/signup', userController.createUser);

router.get('/login', userController.loginLanding);
router.post('/login', userController.login);

router.get('/gabhome', gabbleController.landing);
router.post('/creategab', gabbleController.createPost);


};
