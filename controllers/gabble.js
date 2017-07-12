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
      // var context = {
      //   message: "uploaded new gab"
      // };
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
      // models.User.setUserLikes(gab);
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
          // console.log("LIKES ", context.likes);
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
// });
  }
};

//hang on to for now:
///////////////////
//     models.Gab.findOne({
//       where: {
//         id: req.params.id
//       }
//         // include: [{
//         //   model: models.User,
//         //   as: 'user'
//         // }],
// }).then(function(gab){
//   console.log('FINDING GAB TO DELETE ', gab);
// //?
//   //  gab.getUserLikes(req.params.id).then(function(){
//     console.log("gab to delete? ", gab);
/////////////////


// var gab = models.Gab.findAll().then(function(gabs){
//   gab.getUserLikes();
// console.log("HERE ", getUserLikes);

// });

// models.Gab.findOne({
//   where: {
//     id: req.params.id
//   },
//   include: [{
//     model: models.User,
//     as: 'user'
//   }],
// }).then(function(gab) {
//   // models.User.setUserLikes(gab);
//   console.log(req.session.user);
//   gab.getUserLikes(req.session.userId);
//
//   console.log('trying to add like to userGabs table');
//   var context = {
//     model: gab,
//     name: req.session.name,
//     loggedIn: true,
//     signedIn: true,
//     id: req.params.id
//   };
// req.session.gabId = gabId;

// res.render('likes', context);
/*
models.Gab.findOne({
  where: {
    id: req.params.id,
    userId: req.session.userId
  }
}).then(function(gab){
  gab.getGabLikes.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(gab){
    console.log(GabLikes);
  });
},
models.Gab.destroy({
  where: {
    id: req.params.id,
    userId: req.session.userId
  }
}).then(function() {
  console.log('removed gab #', req.body.id);
  res.redirect('/gabhome');
})
);

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
