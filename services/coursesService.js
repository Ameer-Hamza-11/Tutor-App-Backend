const { Course, CourseEnrollment, Subjects, Users } = require('../models');
const AppError = require('../utils/AppError');


const createCourse = async (data) => {
    const { Teacher_Id, Subject_Id, Title, Description, Duration, Fee, Level, Language, Thumbnail, Max_Students, Mode } = data;

    const user = await Users.findOne({
        where: { User_Id: Teacher_Id }
    })
    if (!user) throw new AppError('User not found');

    const subject = await Subjects.findByPk(Subject_Id)
    if (!subject) throw new AppError('Subject not found');

    const course = await Course.create({
        Teacher_Id,
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

const approveCourse = async (data) => {

    const { IsApproved, Teacher_Id, Course_Id } = data;
    const user = await Users.findOne({
        where: { User_Id: Teacher_Id }
    })
    if (!user) throw new AppError('User not found');

    const course = await Course.findByPk(Course_Id)
    if (!course) throw new AppError('Course not found');

    await course.update({
        IsApproved
    })

    return { message: `Course ${IsApproved ? 'approved' : 'disapproved'} successfully.` };
}

const enrollInCourses = async (data) => {
    const { Course_Id, Student_Id, Enrolled_Date, CompletionPercent, LastAccessDate } = data;

    const user = await Users.findOne({
        where: { User_Id: Student_Id }
    })
    if (!user) throw new AppError('User not found');


    const course = await Course.findByPk(Course_Id)
    if (!course) throw new AppError('Course not found');

    const enrollment = await CourseEnrollment.create({
        Course_Id, Student_Id, Enrolled_Date, CompletionPercent, LastAccessDate
    })

    
  return enrollment;

}



module.exports = { createCourse, approveCourse, enrollInCourses }