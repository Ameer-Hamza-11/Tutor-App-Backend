const coursesService = require('../services/coursesService');


const createCourse = async (req, res, next) => {
    try {
        console.log("req.body ===>", req.body);
        console.log("req.files ===>", req.files);

        if (req.files?.Thumbnail) {
            req.body.Thumbnail = req.files.Thumbnail[0].filename;
        }

        const result = await coursesService.createCourse(req.body, req.user.role, req.user.id)
        return res.status(201).json({ message: 'Course created successfully', course: result });
    } catch (error) {
        next(error)
    }
}

const approveCourse = async (req, res, next) => {
    try {
        const result = await coursesService.approveCourse(req.body, req.user.role, req.user.id)
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}


const enrollInCourses = async (req, res, next) => {
    try {
        const result = await coursesService.enrollInCourses(req.body, req.user.role, req.user.id)
        return res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = { createCourse, approveCourse, enrollInCourses }