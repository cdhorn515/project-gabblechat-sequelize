
const models = require('../models'),
      // Gab =
      session = require('express-session');

module.exports = {
  landing: function (req, res){
      models.Gab.findAll({
        include: [
          {
            model: models.User,
            as: 'user'
          }
        ]
      }).then(function(gabs){
        console.log(gabs.text);
        res.render('gabhome', {gabs: gabs});
      });
  },
  createPost: function (req, res){
      // if(result.notEmpty()) {
        models.Gab.create({
          text: req.body.gab,
          userId: req.session.userId
      }).then(function(newGab){
        req.session.gabId= newGab.id;
        console.log(newGab.text);
        var context = {
          message: "uploaded new gab"
        };
        res.render('gabhome', context);
      });
    // }
  },
  likePost: function (req, res){
    models.userGabs.create({
      userId: req.session.userId,
      gabId: req.body.id
    }).then(function(userGab){
      req.session.userGabId = userGab.id;
      console.log(userId + ' added like to post ' + gabId);
      console.log("this is like # ", req.session.userGabId);
    });
  }
};
