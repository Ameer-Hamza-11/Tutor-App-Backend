const { Course, CourseEnrollment, Subjects } = require('../models');
const AppError = require('../utils/AppError');


const createCourse = async (data, role, userId) => {
    const { Subject_Id, Title, Description, Duration, Fee, Level, Language, Thumbnail, Max_Students, Mode } = data;

    if (role !== 'Teacher') throw new AppError('Only teachers can create courses.', 403);

    const subject = await Subjects.findByPk(Subject_Id)
    if (!subject) throw new AppError('Subject not found', 404);

    const existingCourse = await Course.findOne({
        where: {
            Teacher_Id: userId,
            Subject_Id
        }
    });


    if (existingCourse) {
        throw new AppError('You have already created a course for this subject.', 400);
    }

    const course = await Course.create({
        Teacher_Id: userId,
        Subject_Id,
        Title,
        Description,
        Duration,
        Fee,
        Level,
        Language,
        Thumbnail,
        Max_Students,
        Mode
    })

    return course;

}

const approveCourse = async (data, role, userId) => {

    const { IsApproved, Course_Id } = data;


    const course = await Course.findByPk(Course_Id)
    if (!course) throw new AppError('Course not found', 404);

    if (role !== 'Admin') throw new AppError('Only Admin can approve this course.', 403);

    await course.update({
        IsApproved
    })



    return { message: `Course ${IsApproved ? 'approved' : 'disapproved'} successfully.` };
}

const enrollInCourses = async (data, role, userId) => {
    const { Course_Id, Enrolled_Date, CompletionPercent, LastAccessDate } = data;



    const course = await Course.findByPk(Course_Id)
    if (!course) throw new AppError('Course not found', 404);

    const alreadyEnrolled = await CourseEnrollment.findOne({
        where: { Course_Id, Student_Id: userId },
    });


    if (alreadyEnrolled) throw new AppError('You are already enrolled in this course.', 400);

    if (role !== 'Student') throw new AppError('Only students can enroll in courses.', 403);

    const enrollment = await CourseEnrollment.create({
        Course_Id, Student_Id: userId, Enrolled_Date, CompletionPercent, LastAccessDate
    })



    return enrollment;

}



module.exports = { createCourse, approveCourse, enrollInCourses }