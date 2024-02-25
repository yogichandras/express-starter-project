'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'roleId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'roles',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'roleId');
  }
};
