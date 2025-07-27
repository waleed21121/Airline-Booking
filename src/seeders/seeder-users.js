'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = Array.from({ length: 100 }, (_, i) => ({
      username: `user${i + 1}`.padEnd(5, ' '), // Ensures min length of 5
      email: `user${i + 1}@gmail.com`,
      password: `password${i + 1}`.padEnd(8, ' '), // Ensures min length of 8
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};