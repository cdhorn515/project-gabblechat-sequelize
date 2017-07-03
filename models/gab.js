'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    text: DataTypes.STRING
  }, {});

    Gab.associate = function(models){
      Gab.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });
    //   Gab.belongsToMany(models.User, {as: 'likes', through: 'userGabs', foreignKey: 'gabId'});
    };
    return Gab;
  };
