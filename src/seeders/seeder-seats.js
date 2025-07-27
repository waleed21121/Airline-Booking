'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const seatTypes = ['business', 'economy', 'premium-economy', 'first-class'];
    const seats = Array.from({ length: 100 }, (_, i) => ({
      airplaneId: (i % 100) + 8, // References Airplane IDs 1–100
      row: Math.floor(i / 4) + 1, // Rows 1–25
      col: String.fromCharCode(65 + (i % 4)), // Columns A–D
      type: seatTypes[Math.floor(i / 25)], // Distribute seat types evenly
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Seats', seats, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Seats', null, {});
  }
};