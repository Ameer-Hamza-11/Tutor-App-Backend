const { Course, CourseEnrollment, Subjects, Languages, Users, User_Languages, sequelize } = require('../models');
const AppError = require('../utils/AppError');


const createCourse = async (data, role, userId) => {
    const transaction = await sequelize.transaction()
    try {
        const { Subject_Id, Title, Description, Duration, Fee, Level, Language_Id, Thumbnail, Max_Students, Mode } = data;

        if (role !== 'Teacher') throw new AppError('Only teachers can create courses.', 403);

        const subject = await Subjects.findByPk(Subject_Id)
        if (!subject) throw new AppError('Subject not found', 404);

        const language = await Languages.findByPk(Language_Id)
        if (!language) throw new AppError('Language not found', 404);

        await User_Languages.create({
            User_Id: userId,
            Language_Id: language.Language_Id,
            Proficiency_Level: 5,
            Score: 80.9
        }, { transaction })

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
            Language: language.Language_Name,
            Thumbnail,
            Max_Students,
            Mode
        }, { transaction })

        await transaction.commit();

        return course;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}

const approveCourse = async (data, role, userId) => {

    const { IsApproved, IsDeleted, Course_Id } = data;


    const course = await Course.findByPk(Course_Id)
    if (!course) throw new AppError('Course not found', 404);

    if (role !== 'Admin') throw new AppError('Only Admin can approve this course.', 403);

    if (IsApproved) {
        await course.update({
            IsApproved
        })
    }

    if (IsDeleted) {
        await course.update({
            IsDeleted
        })
    }
    if (IsApproved && !IsDeleted) {
        await sendCourseNotificationToStudents(course, course.Subject_Id);
    }


    return { message: `${course.Title} has been ${IsApproved ? 'approved' : 'disapproved'} successfully.` }
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


const getAllCourses = async () => {
    const courses = await Course.findAll({
        where: {
            IsApproved: false,
            IsDeleted: false
        }
    });
    if (!courses || courses.length === 0) {
        return [];
    }
    return courses
}

const getCourseById = async (id) => {
    const course = await Course.findOne({
        where: { Course_Id: id },
        include: [{
            model: Subjects, as: "subject",
            attributes: ['Subject_Name', 'Description']
        }, {
            model: Users, as: "teacher",
            attributes: ['First_Name', 'Last_Name', 'isVerified', 'User_Id']
        }],
    });
    if (!course) {
        throw new AppError("course not found", 404);
    }
    return course
}

const { Op } = require("sequelize");
const { sendCourseNotificationToStudents } = require('./notificationService');

const getAllApprovedCourses = async (userId) => {

    const enrolledCourses = await CourseEnrollment.findAll({
        where: { Student_Id: userId },
        attributes: ["Course_Id"],
    });


    const enrolledCourseIds = enrolledCourses.map((c) => c.Course_Id);


    const courses = await Course.findAll({
        where: {
            IsApproved: true,
            IsDeleted: false,
            Course_Id: {
                [Op.notIn]: enrolledCourseIds,
            },
        },
    });


    if (!courses || courses.length === 0) {
        return [];
    }

    return courses;
};

const getApprovedCourseById = async (id) => {
    const course = await Course.findOne({
        where: {
            Course_Id: id,
            IsApproved: true,
            IsDeleted: false
        },
        include: [{
            model: Subjects, as: "subject",
            attributes: ['Subject_Name', 'Description']
        }, {
            model: Users, as: "teacher",
            attributes: ['First_Name', 'Last_Name', 'isVerified', 'User_Id']
        }],
    });
    if (!course) {
        throw new AppError("course not found", 404);
    }
    return course
}



module.exports = { createCourse, approveCourse, enrollInCourses, getAllCourses, getCourseById, getAllApprovedCourses, getApprovedCourseById }