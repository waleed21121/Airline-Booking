'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cities = Array.from({ length: 100 }, (_, i) => ({
      name: `City ${i + 1}`.padEnd(4, ' '), // Ensures min length of 4
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Cities', cities, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};