'use strict';
const { TutorAssignments, Jobs, Users, Statuses } = require('../models');
const AppError = require('../utils/AppError');

const getAllAssignments = async () => {
  const assignments = await TutorAssignments.findAll({
    include: [
      { model: Jobs, as: 'job' },
      { model: Users, as: 'tutor', attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] } },
      { model: Users, as: 'student', attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] } },
      { model: Statuses, as: 'assignmentStatus' }
    ]
  });

  if (!assignments || assignments.length === 0) throw new AppError("No assignments found", 404);
  return assignments;
}


const getAssignmentsByJob = async (assignmentId) => {
  const assignments = await TutorAssignments.findAll({
    where: { Assignment_Id: assignmentId },
    include: [
      { model: Jobs, as: 'job' },
      { model: Users, as: 'tutor', attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] } },
      { model: Users, as: 'student', attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] } },
      { model: Statuses, as: 'assignmentStatus' }
    ]
  });

  if (!assignments || assignments.length === 0) throw new AppError("No assignments found", 404);
  return assignments;
};

module.exports = {
  getAllAssignments,
  getAssignmentsByJob
};
