'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Users',
      'username',
      {
        type: Sequelize.STRING,
        unique: {
          args: true,
          msg: 'Someone took that name already, please choose another'
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Oops! Looks like you forgot to enter some information!'
          }
        }
      },
      'Users',
      'password',
       {
          type: Sequelize.STRING,
          allowNull: false
        }
    );
},
  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Users',
      'username',
      {
        allowNull: true
      },
      'Users',
      'password',
      {
        allowNull: true
      }
    );
  }
};
