'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
        queryInterface.changeColumn(
          'Users',
          'name',
          {
            type: Sequelize.STRING,
            unique: {
              msg: 'Someone took that name already, please choose another'
            },
          }
        );
      },
        down: function (queryInterface, Sequelize) {
          
        }
      };
