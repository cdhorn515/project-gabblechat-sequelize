'use strict';
//don't do this way, separate cols
module.exports = {
up: function (queryInterface, Sequelize) {
  return queryInterface.addColumn(
    'userGabs',
    'createdAt',
    {
      allowNull: false,
      type: Sequelize.DATE
    },
    'userGabs',
    'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE
    }
  );
},

down: function (queryInterface, Sequelize) {
}
};
