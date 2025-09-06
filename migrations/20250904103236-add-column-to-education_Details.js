'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('EducationDetails', 'Document_Id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Set_Documents',
        key: 'Document_Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('EducationDetails', 'Document_Id');
  }
};
