'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const airplanes = Array.from({ length: 100 }, (_, i) => ({
      modelNumber: `Boeing 737-${i + 100}`.padEnd(5, ' '), // Ensures min length of 5
      capacity: Math.floor(Math.random() * 500) + 100, // Between 100 and 599
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Airplanes', airplanes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Airplanes', null, {});
  }
};