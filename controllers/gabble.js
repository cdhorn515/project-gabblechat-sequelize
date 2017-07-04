
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
        //this shows as undefined
        // console.log('gab.text', gab.text);
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
        console.log("gabble line 28 ", newGab.id);
        var context = {
          message: "uploaded new gab"
        };
        res.render('gabhome', context);
      });
    // }
  },
  likePost: function (req, res){

    models.Gab.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(gab) {
      models.Gab.addLikes(gab);
      console.log('trying to add like');
    });
    res.redirect('/gabhome');
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
