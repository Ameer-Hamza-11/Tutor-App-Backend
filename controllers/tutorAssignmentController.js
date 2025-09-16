'use strict';
const tutorAssignmentService = require('../services/tutorAssignmentService');

const addAssignment = async (req, res, next) => {
  try {
    const data = req.body;
    const assignment = await tutorAssignmentService.addAssignment(data);
    res.status(201).json(assignment);
  } catch (error) {
    next(error);
  }
};

const getAssignmentsByJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const assignments = await tutorAssignmentService.getAssignmentsByJob(jobId);
    res.status(200).json(assignments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAssignment,
  getAssignmentsByJob
};
