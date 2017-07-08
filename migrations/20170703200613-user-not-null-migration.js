'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
        queryInterface.changeColumn(
          'Users',
          'name',
          {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isAlpha: {
                msg: 'Unless you are from another galaxy you\'re name should only have letters'
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
          'name',
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
