'use strict';
import permissions from '../../consts/permissions.js';
import roles from '../../consts/roles.js';
import { hash } from 'bcrypt';

module.exports = {
  async up (queryInterface, Sequelize) {
    /* CREATE ROLE */
    await queryInterface.bulkInsert('roles', [
      {
        name: roles.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const roleId = await queryInterface.rawSelect('roles', {
      where: {
        name: roles.ADMIN
      }
    }, ['id']);

    /* CREATE PERMISSIONS */
    await queryInterface.bulkInsert('permissions', [
      {
        name: permissions.USER,
        roleId: roleId, // Access the id property of the result
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    /* CREATE USER */
    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Admin',
        lastName: 'Dev',
        email: 'admin@dev.com',
        password: await hash('123qwe', 10),
        roleId: roleId, // Access the id property of the result
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface) { // Remove unused Sequelize parameter
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('permissions', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
};
