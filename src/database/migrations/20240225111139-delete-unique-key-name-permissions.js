'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('permissions', 'permissions_name_key');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addConstraint('permissions', {
      fields: ['name'],
      type: 'unique',
      name: 'permissions_name_key',
    });
  }
};
