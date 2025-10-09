const express = require('express');
const auth_middleware = require('../middlewares/verify_token');
const authorizeRoles = require('../middlewares/authorizeRoles');
const { createCourse, approveCourse, enrollInCourses, getAllCourses, getCourseById, getAllApprovedCourses, getApprovedCourseById } = require('../controllers/coursesController');
const { upload } = require('../middlewares/upload');
const router = express.Router()

router.use(auth_middleware)

router.route('/upload-courses').post(authorizeRoles('Teacher'), upload.fields([{ name: 'Thumbnail', maxCount: 1 }]), createCourse)
router.route('/enroll-in-courses').post(authorizeRoles('Student'), enrollInCourses)
router.route('/get-all-approved-courses').get(authorizeRoles('Student'), getAllApprovedCourses)
router.route('/get-approved-course/:id').get(authorizeRoles('Student'), getApprovedCourseById)

//? For Admin Only
router.route('/approve-courses').patch(authorizeRoles('Admin'), approveCourse)
router.route('/get-all-courses').get(authorizeRoles('Admin'), getAllCourses)
router.route('/get-course/:id').get(authorizeRoles('Admin'), getCourseById)



module.exports = router