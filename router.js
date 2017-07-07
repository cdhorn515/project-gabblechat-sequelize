const express = require('express'),
      // models = require('./models'),
      // sequelize = require('sequelize'),
      userController = require('./controllers/user'),
      gabbleController = require('./controllers/gabble');

      // var router = express.Router();

module.exports = function(router) {

router.get('/', userController.landing);

router.get('/signup', userController.landing);
router.post('/signup', userController.createUser);

router.get('/login', userController.loginLanding);
router.post('/login', userController.login);

router.post('/gabhome', gabbleController.landing);
router.get('/gabhome', gabbleController.landing);

// router.post('/gabhome/:id', gabbleController.likePost);
// router.get('/gabhome/:id', gabbleController.likePost);

router.get('/creategab', gabbleController.createPostLanding);
router.post('/creategab', gabbleController.createPost);

// router.get('/likes/:id', gabbleController.likePost);
router.get('/likes/:id', gabbleController.displayLikes);

router.post('/delete/:id', gabbleController.deletePost);

};
