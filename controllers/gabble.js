
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
        var context = {
          model: gabs,
          loggedIn: true,
          name: req.session.name,
          signedIn: true
        };
        //this shows as undefined
        // console.log('gab.text', gab.text);
        console.log("gabble line 24", req.session.name);
        res.render('gabhome', context);
      });
  },
  createPostLanding: function(req, res){
    var context = {
      name: req.session.name,
      loggedIn: true,
      signedIn: true
    };
    res.render('creategab', context);
  },
  createPost: function (req, res){
      // if(result.notEmpty()) {
        models.Gab.create({
          text: req.body.gab,
          userId: req.session.userId
      }).then(function(newGab){
        req.session.gabId= newGab.id;
        console.log("gabble line 28 ", newGab.id);
        var context = {
          message: "uploaded new gab"
        };
        res.render('creategab', context);
      });
    // }
  },
  likePost: function (req, res){

    models.Gab.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(gab) {
      models.Gab.setUserLikes(gab);
      console.log('trying to add like to userGabs table');
      var context = {
        model: gab,
        name: req.session.name,
        loggedIn: true,
        signedIn: true,
      };
      res.render('likes', context);
    });
  },
  displayLikes: function (req, res) {
    var context = {};
    models.Gab.getUserLikes({
      where: {
        gabId: req.params.id
      }

    }).then(function(){
      var context = {
        name: req.session.name,
        loggedIn: true,
        signedIn: true
      };
      req.session.gabId = gabId;

      res.render('likes', context);

    });
  },
  deletePost: function (req,res) {
      models.Gab.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(){
        console.log('removed gab #', req.body.id);
        var context = {
          name: req.session.name,
          loggedIn: true,
          signedIn: true
        };
        res.render('gabhome', context);
    });
  }
};


/*
models.userGabs.create({
  userId: req.session.userId,
  gabId: req.params.id
}).then(function(userGabs){
  req.session.userGabsId = userGabs.id;
  console.log('usergab id ', userGabs.id);
  console.log(userId + ' added like to post ' + gabId);
  console.log("this is like # ", req.session.userGabsId);
});
*/
//not sure this is correct, remove for now
/*

*/
/*
models.Gab.findAll({
  include: [
    {
      model: models.User,
      as: 'userId',
      through: 'userGabs'
    }
  ]
  */
