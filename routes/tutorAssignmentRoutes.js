'use strict';
const express = require('express');
const router = express.Router();
const { getAllAssignments, getAssignmentsByJob } = require('../controllers/tutorAssignmentController');

const auth_middleware = require('../middlewares/verify_token');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.use(auth_middleware);

// Admin can create tutor assignments
router.get('/', authorizeRoles('Admin'), getAllAssignments);

// Get assignments by job ID
router.get('/:assignmentId', getAssignmentsByJob);

module.exports = router;
