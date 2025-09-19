'use strict';
const tutorAssignmentService = require('../services/tutorAssignmentService');

const getAllAssignments = async (req, res, next) => {
  try {
    const assignment = await tutorAssignmentService.getAllAssignments();
    return res.status(200).json(assignment);
  } catch (error) {
    next(error);
  }
};

const getAssignmentsByJob = async (req, res, next) => {
  try {
    const assignmentId = req.params.assignmentId;
    const assignments = await tutorAssignmentService.getAssignmentsByJob(assignmentId);
    return res.status(200).json(assignments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAssignments,
  getAssignmentsByJob
};
