const models = require('../models');
const Sequelize = require('sequelize');
// console.log('here ', models);
// console.log(models);
// User = require('')
// session = require('express-session');

module.exports = {
  index: function(req, res) {
    var context = {};
    res.render('signup', context);
  },
  landing: function(req, res) {
    res.render('signup');
  },
  createUser: function(req, res) {
    // console.log(models.use);
      models.User.create({
        name: req.body.name,
        password: req.body.password
      }).then(function(newUser){
        req.session.userId = newUser.id;
        console.log(req.session.userId);
        console.log('validating');
      }).catch(Sequelize.UniqueConstraintError, function(error){
        console.log('unique ', error);
        var context = {
          msg: msg
        };
        res.render('signup', context);
      }).catch(Sequelize.ValidationError, function (error) {
        console.log('validate ', error);
        var context = {
          msg: msg
        };
        res.render('signup', context);
      }).catch(function(error){
        console.log('oh no, something went wrong! ', error);
        var context = {
          msg: "oh no!"
        };
        res.render('signup', context);
      });
    },

  loginLanding: function(req, res) {
    var context = {};
    res.render('login', context);
  },
  login: function(req, res) {
    var context = {};
    //pull data from page entry
    var name = req.body.name;
    var password = req.body.password;
    //findOne in database that matches username
    models.User.findOne({
      where: {
        name: name
      }
    }).then(function(user) {
      //if match then pull database info and store in session
      if (password === user.password) {
        req.session.user = user;
        req.session.name = user.name;
        req.session.password = user.password;
        req.session.userId = user.id;
        //returns entire object of user created
        console.log('user id is: ', req.session.userId);
        console.log('user name is: ', req.session.user.name);
        res.render('gabhome');
        return;
      }
      // } else {
      //   var context = {
      //     msg: "this user is not in our database, please complete the sign up form in order to create your account"
      //   };
      //   res.render('signup', context);
      // }
    });
  }
};

/*
if (!req.body.username || !req.body.password) {
  var context = {
    msg: "please complete the form in order to create an account"
  };
  res.render('signup', context);
  return;
}
*/

/*
 createUser: function(req, res) {
    if(req.body.username && req.body.password) {
     req.getValidationResult().then(function(result) {
      if (result.isEmpty()) {
         models.user.create({
          username: req.body.username,
          password: req.body.password
        }).then(function(newUser) {
          console.log('signed up');
          req.session.userId = newUser.id;
          res.redirect('/login');
        });
      }
    });
    }
    */
// createUser: function(req, res) {
//   if (req.body.username && req.body.password) {
//     models.user.create({
//       username: req.body.username,
//       password: req.body.password,
//     }).then(function(user) {
//       console.log(user);
//     }).catch(Sequelize.UniqueConstraintError, function(error) {
//       console.log("Username not unique!");
//     }).catch(Sequelize.ValidationError, function(error) {
//       console.log("Not valid!", error);
//     }).catch(function(error) {
//       // handle all other errors
//       console.log("Oh no!", error);
//       console.log(error.message);
//       var context = {
//         error: error
//       };
//       res.render('signup', context);
//     });
//     req.session.userId = newUser.id;
//     console.log('signed up');
//     res.redirect('/login');
//   }

/*
createUser: function(req, res) {
    req.getValidationResult().then(function(result) {
      console.log('validating');
    }).catch(Sequelize.UniqueConstraintError, function(error) {
      console.log("Username not unique!");
      var context = {
        msg: error
      };
      res.render('signup', context);
      return;
    }).catch(Sequelize.ValidationError, function(error) {
      console.log("Not valid!", error);
      var context = {
        msg: error
      };
      res.render('signup', context);
      return;
    }).catch(function(error) {
      // handle all other errors
      console.log("Oh no!", error);
      console.log(error.message);
      var context = {
        msg: error
      };
      res.render('signup', context);
      return;
    });
    models.user.create({
      username: req.body.username,
      password: req.body.password
    }).then(function(newUser) {
      console.log('signed up');
      req.session.userId = newUser.id;
      res.redirect('/login');
    });
    */
