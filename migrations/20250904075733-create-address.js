'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      Address_Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AddressLine1: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      AddressLine2: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      City_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cities',   // Cities table
          key: 'City_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Country_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Countries',  // Countries table
          key: 'Country_Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Postal_Code: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      Latitude: {
        type: Sequelize.DECIMAL(9,6),
        allowNull: true
      },
      Longitude: {
        type: Sequelize.DECIMAL(9,6),
        allowNull: true
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};
