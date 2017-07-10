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
      }],
      order: [
        ['createdAt', 'DESC']
      ]
    }).then(function(gabs) {
      context.model = gabs;
      gabs.forEach(function(gab){
        var gabInfo={};
        console.log('hi');
        gab.getUserLikes().then(function(result){
          gabInfo = {
            gab: gab,
            likes: result.length
          };
          console.log("gabinfo ",gabInfo);
          context.modelArray.push(gabInfo);

          // context.modelArray = [{
          //   model: gab,
          //   likes: result.length
          // }];
          console.log("MODEL ARRAY WORKING");
          console.log("context ", context);
          context.likes = result.length;
          console.log('likes', context.likes);
        });
      });
      res.render('gabhome', context);
    });
    // gabs.forEach(function(gabs){
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
    // if(result.notEmpty()) {
    models.Gab.create({
      text: req.body.gab,
      userId: req.session.userId
    }).then(function(newGab) {
      req.session.gabId = newGab.id;
      var context = {
        message: "uploaded new gab"
      };
      res.render('creategab', context);
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
          context.likes.push(result.name);
          console.log(result.name);
        }
        res.render('likes', context);
      });
    });
  },
  deletePost: function(req, res) {

    //     models.Gab.findAll({
    //       where: {
    //         id: req.params.id
    //       },
    //         include: [{
    //           model: models.User,
    //           as: 'user'
    //         }],
    // }).then(function(gabs){
    //   console.log('FINDING GAB TO DISPLAY ', gabs);
    //   //haven't checked this yet
    //   gabs.getUserLikes().then(function(){
    //     console.log("number of likes? ", results.length);


    // res.render('likes');
        //  gab.destroy();
      //  });
    // });

  }
};

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
