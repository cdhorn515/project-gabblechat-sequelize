'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    text: {
      type: DataTypes.STRING,
      max: 140
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {});

    Gab.associate = function(models){
      Gab.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
      });
      Gab.belongsToMany(models.User, {as: 'UserLikes', through: 'userGabs', foreignKey: 'gabId'});
    };

    Gab.prototype.showDeleteIfOwner = function() {
      return function (val, render) {
        const id = render(val);
        if (id == this.userId) {
          // render the delete button
        return render(` <form class="" action="/delete/{{id}}" method="post">
          <input type="submit" name="like" value="Delete" id="{{id}}">  </form>`);
              }
      };
    };
    return Gab;
  };
