'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const codes = new Set();
    const generateCode = (index) => {
      // Generate codes like AAA, AAB, AAC, ..., ZZZ
      const first = Math.floor(index / (26 * 26));
      const second = Math.floor((index % (26 * 26)) / 26);
      const third = index % 26;
      return (
        String.fromCharCode(65 + first) +
        String.fromCharCode(65 + second) +
        String.fromCharCode(65 + third)
      );
    };

    // Generate 100 unique codes
    const airports = Array.from({ length: 100 }, (_, i) => {
      let code;
      do {
        code = generateCode(i);
      } while (codes.has(code) && codes.size < 100); // Ensure uniqueness
      codes.add(code);
      return {
        name: `Airport ${i + 1}`.padEnd(5, ' '), // Ensures min length of 5
        code: code,
        address: `123 Airport Rd, City ${i + 1}`,
        cityID: (i % 100) + 5, // References City IDs 1–100
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Airports', airports, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Airports', null, {});
  }
};