'use strict';
const express = require('express');
const router = express.Router();
const { addAssignment, getAssignmentsByJob } = require('../controllers/tutorAssignmentController');

const auth_middleware = require('../middlewares/verify_token');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.use(auth_middleware);

// Admin can create tutor assignments
router.post('/', authorizeRoles('Admin'), addAssignment);

// Get assignments by job ID
router.get('/job/:jobId', getAssignmentsByJob);

module.exports = router;
