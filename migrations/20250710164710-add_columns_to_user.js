'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'isVerified', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    })

    await queryInterface.addColumn('Users', 'verifyToken', {
      allowNull: false,
      type: Sequelize.STRING
    })

    await queryInterface.addConstraint('Users', {
      fields: ['email'],
      type: 'unique',
      name: 'unique_email_constraint'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'isVerified')
    await queryInterface.removeColumn('Users', 'verifyToken')
    await queryInterface.removeConstraint('Users', 'unique_email_constraint')
  }
};
