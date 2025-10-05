const express = require('express');
const auth_middleware = require('../middlewares/verify_token');
const authorizeRoles = require('../middlewares/authorizeRoles');
const { createCourse, approveCourse, enrollInCourses } = require('../controllers/coursesController');
const router = express.Router()

router.use(auth_middleware)

router.route('/upload-courses').post(authorizeRoles('Teacher'), createCourse)
router.route('/approve-courses').patch(authorizeRoles('Admin'), approveCourse)
router.route('/enroll-in-courses').post(authorizeRoles('Student'), enrollInCourses)



module.exports = router