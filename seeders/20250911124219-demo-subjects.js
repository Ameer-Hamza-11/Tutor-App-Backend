'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subjects', [
      {
        Subject_Name: 'Mathematics',
        Description: 'Covers algebra, geometry, calculus, and statistics.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      },
      {
        Subject_Name: 'Physics',
        Description: 'Focuses on mechanics, thermodynamics, and electromagnetism.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      },
      {
        Subject_Name: 'Chemistry',
        Description: 'Covers organic, inorganic, and physical chemistry.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      },
      {
        Subject_Name: 'Biology',
        Description: 'Studies living organisms, anatomy, and physiology.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      },
      {
        Subject_Name: 'Computer Science',
        Description: 'Includes programming, databases, and computer networks.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      },
      {
        Subject_Name: 'English',
        Description: 'Focuses on grammar, literature, and communication skills.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      },
      {
        Subject_Name: 'Economics',
        Description: 'Covers microeconomics, macroeconomics, and finance basics.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      },
      {
        Subject_Name: 'History',
        Description: 'Covers world history, civilizations, and important events.',
        Is_Active: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subjects', null, {});
  }
};
