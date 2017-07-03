'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Gabs',
      'text',
      {
        type: Sequelize.STRING(140),
        allowNull: false
      }
    );
    },

    down: function (queryInterface, Sequelize) {
      queryInterface.changeColumn(
        'Gabs',
        'text',
        {
          type: Sequelize.STRING(140),
          allowNull: true
        }
      );
    }
  };
