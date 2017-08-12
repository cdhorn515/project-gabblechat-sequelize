const models = require('../models');
const Sequelize = require('sequelize');

module.exports = {
  landing: function(req, res) {
    req.session.user = '';
    var context = {
      loggedIn: false,
      signedIn: false
    };
    res.render('signup');
  },
  createUser: function(req, res) {
    models.User.create({
      name: req.body.name,
      password: req.body.password
    }).then(function(newUser) {
      req.session.userId = newUser.id;
      req.session.name = req.body.name;
      res.redirect('/gabhome');
    }).catch(Sequelize.UniqueConstraintError, function(error) {
      // console.log('UNIQUE----------- ', error.message);
      var context = {
        msg: "Someone's using that name already, please choose another"
      };
      res.render('signup', context);

    }).catch(Sequelize.ValidationError, function(error) {
      var context = {
        msg: "Oops, something went wrong, please check your information and try again"
      };
      res.render('signup', context);
    });
  },

  loginLanding: function(req, res) {
    var context = {
      loggedIn: false,
      signedIn: false,
      loginPage: true
    };
    res.render('login', context);
  },
  login: function(req, res) {
    var context = {
      loggedIn: false,
      signedIn: false,
      loginPage: true
    };
    //pull data from page entry
    //findOne in database that matches username
    var name = req.body.name;

    models.User.findOne({
      where: {
        name: name
      }
    }).then(function(user) {
      var password = req.body.password;
      if (!user) {
        context = {
          loggedIn: false,
          signedIn: false,
          msg: "Oops! You are not in our database, please complete the sign up form in order to create your account"
        };
        res.render('signup', context);
      } else {
        //if match then pull database info and store in session
        if (password === user.password) {
          req.session.user = user;
          req.session.name = user.name;
          req.session.password = user.password;
          req.session.userId = user.id;
          //returns entire object of user created
          console.log('user id is: ', req.session.userId);
          console.log('user name is: ', req.session.user.name);
          res.redirect('/gabhome');
        }
      }
    });
  }
};
