'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Someone took that name already, please choose another'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Oops! Looks like you forgot to enter some information!'
        },
        isAlpha: {
          msg: 'Unless you\'re from another planet, your name should only contain letters'
        }
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
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Gab, {
      as: 'GabLikes',
      through: 'userGabs',
      foreignKey: 'userId'
    });
  };
  return User;
};
