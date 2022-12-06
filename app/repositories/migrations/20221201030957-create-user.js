'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      otaKey: {
        type: Sequelize.STRING(128)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    await queryInterface.addIndex('Users', ['account'])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
}
