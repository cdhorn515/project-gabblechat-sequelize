var parseurl = require('parseurl'),
  session = require('express-session'),
  express = require('express');

var app = express();

app.use(session({
  secret: 'coding',
  resave: false,
  saveUninitialized: false
}));

module.exports = {
  /*
  checkIfUser: function(req, res, next) {
    var pathname = parseurl(req).pathname;
    if (!req.session.userId && pathname != '/signup'){
      res.render('login');
    } else {
      next();
    }
  }
  */
    // checkUserId: function(req, res, next) {
    //   /*
    // FIX  where does this go? prob in controller?
    //   */
    //   var sess = req.session;
    //   if (!sess.userID) {
    //     next();
    //   }
    // }

};
