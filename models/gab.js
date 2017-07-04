'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    text: {
      type: DataTypes.STRING,
      max: 140
    }
  }, {});

    Gab.associate = function(models){
      Gab.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });
      Gab.belongsToMany(models.User, {as: 'likes', through: 'userGabs', foreignKey: 'gabId'});
    };
    return Gab;
  };
