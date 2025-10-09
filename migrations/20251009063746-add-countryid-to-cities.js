'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Cities', 'Country_Id', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'Countries',
        key: 'Country_Id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Cities', 'Country_Id');
  },
};
