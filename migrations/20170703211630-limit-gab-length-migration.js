'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
  return queryInterface.changeColumn(
    'Gabs',
     'text',
      {
      type: Sequelize.STRING,
      validate: {
        max: 140
      }
    }
  );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Gabs',
      'text',
      {
        type: Sequelize.STRING
      }
    );
  }
};
