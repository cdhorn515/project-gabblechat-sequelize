'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
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
      as: 'likes',
      through: 'userGabs',
      foreignKey: 'userId'
    });
  };
  return User;
};
