'use strict';
const { TutorAssignments, Jobs, Users, Statuses, sequelize } = require('../models');
const AppError = require('../utils/AppError');

const addAssignment = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const { Job_Id, Tutor_Id, Student_Id, Start_Date, End_Date, Status } = data;

    // Validate Job
    const job = await Jobs.findByPk(Job_Id, { transaction });
    if (!job) throw new AppError("Invalid Job_Id", 400);

    // Validate Tutor & Student
    const tutor = await Users.findByPk(Tutor_Id, { transaction });
    if (!tutor) throw new AppError("Invalid Tutor_Id", 400);

    const student = await Users.findByPk(Student_Id, { transaction });
    if (!student) throw new AppError("Invalid Student_Id", 400);

    // Validate Status
    const statusRecord = await Statuses.findByPk(Status || 1, { transaction });
    if (!statusRecord) throw new AppError("Invalid Status", 400);

    const assignment = await TutorAssignments.create(
      { Job_Id, Tutor_Id, Student_Id, Start_Date, End_Date, Status: Status || 1 },
      { transaction }
    );

    await transaction.commit();
    return assignment;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getAssignmentsByJob = async (jobId) => {
  const assignments = await TutorAssignments.findAll({
    where: { Job_Id: jobId },
    include: [
      { model: Jobs, as: 'job' },
      { model: Users, as: 'tutor', attributes: { exclude: ['Password','isVerified','verificationToken','verificationTokenExpires'] } },
      { model: Users, as: 'student', attributes: { exclude: ['Password','isVerified','verificationToken','verificationTokenExpires'] } },
      { model: Statuses, as: 'assignmentStatus' }
    ]
  });

  if (!assignments || assignments.length === 0) throw new AppError("No assignments found", 404);
  return assignments;
};

module.exports = {
  addAssignment,
  getAssignmentsByJob
};
