'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate airport codes matching those in seed-airports.js
    const generateCode = (index) => {
      const first = Math.floor(index / (26 * 26));
      const second = Math.floor((index % (26 * 26)) / 26);
      const third = index % 26;
      return (
        String.fromCharCode(65 + first) +
        String.fromCharCode(65 + second) +
        String.fromCharCode(65 + third)
      );
    };

    const flights = Array.from({ length: 100 }, (_, i) => {
      const departureTime = new Date(2025, 8, 1 + (i % 28), 8 + (i % 12), 0); // Random date in Sep 2025
      const arrivalTime = new Date(departureTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
      // Use codes from the first 100 airports (0-based index)
      const departureIndex = i % 100;
      const arrivalIndex = (i + 1) % 100; // Ensure different airports
      const departureAirportId = generateCode(departureIndex);
      const arrivalAirportId = generateCode(arrivalIndex);
      return {
        flightNumber: `FL${100 + i}`.padEnd(3, '0'), // e.g., FL100, FL101
        airplaneId: (i % 100) + 8, // References Airplane IDs 1–100
        departureAirportId,
        arrivalAirportId,
        arrivalTime,
        departureTime,
        price: Math.floor(Math.random() * 500) + 50, // Between 50 and 549
        boardingGate: `Gate ${i + 1}`.padEnd(3, ' '), // Ensures min length of 3
        totalSeats: Math.floor(Math.random() * 400) + 50, // Between 50 and 449
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert('Flights', flights, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Flights', null, {});
  }
};