'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('userGabs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      gabId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Gabs',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAd: {
       allowNull: false,
       type: Sequelize.DATE
      }
    });

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable(
      'userGabs'
    );
  }
};
