'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Gab, {
      as: 'Gabs',
      foreignKey: 'userId',
      onDelete: 'cascade'
    });
    User.belongsToMany(models.Gab, {
      as: 'GabLikes',
      through: 'userGabs',
      foreignKey: 'userId',
      onDelete: 'cascade'
    });
  };
  return User;
};
