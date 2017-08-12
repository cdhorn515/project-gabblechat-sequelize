const models = require('../models'),
  session = require('express-session');

module.exports = {
  landing: function(req, res) {
    var context = {
      loggedIn: true,
      name: req.session.name,
      signedIn: true,
      loggedInUser: req.session.userId,
      modelArray: []
    };
    models.Gab.findAll({
      include: [{
        model: models.User,
        as: 'user'
      }, 'UserLikes'],
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(function(gabs) {
      context.model = gabs;
      console.log(context.modelArray);
      res.render('gabhome', context);
    });
  },
  createPostLanding: function(req, res) {
    var context = {
      name: req.session.name,
      loggedIn: true,
      signedIn: true
    };
    res.render('creategab', context);
  },
  createPost: function(req, res) {
    models.Gab.create({
      text: req.body.gab,
      userId: req.session.userId
    }).then(function(newGab) {
      req.session.gabId = newGab.id;
      res.redirect('/gabhome');
    });
    // }
  },
  likePost: function(req, res) {
    models.Gab.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(gab) {
      console.log('firing', req.session.user);
      gab.addUserLikes(req.session.userId);
      res.redirect('/gabhome');
    });
  },

  displayLikes: function(req, res) {
    models.Gab.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.User,
        as: 'user'
      }]
    }).then(function(gab) {
      gab.getUserLikes().then(function(result) {
        console.log(result, result.length);
        var context = {
          model: gab,
          name: req.session.name,
          loggedIn: true,
          signedIn: true,
          likes: []
        };
        for (var i = 0; i < result.length; i++) {

          console.log(result[i].name);
          context.likes.push(result[i].name);
        }
        res.render('likes', context);
      });
    });
  },
  deletePost: function(req, res) {
    models.Gab.destroy({
      where: {
        id: req.params.id
      }
    });
    res.redirect('/gabhome');
  }
};
