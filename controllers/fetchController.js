// controller
const fetchService = require('../services/fetchService');


//? fetch all subjects
const fetchAllSubjects = async (req, res, next) => {
    try {
        const allSubjects = await fetchService.fetchAllSubjects();
        return res.status(200).json(allSubjects);
    } catch (error) {
        next(error);
    }
}

//? fetch all genders
const fetchAllGenders = async (req, res, next) => {
    try {
        const allGenders = await fetchService.fetchAllGenders();
        return res.status(200).json(allGenders);
    } catch (error) {
        next(error);
    }
}

//? fetch all cities
const fetchAllCities = async (req, res, next) => {
    try {
        const allCities = await fetchService.fetchAllCities();
        return res.status(200).json(allCities);
    } catch (error) {
        next(error);
    }
}

const fetchAllCountries = async (req, res, next) => {
    try {
        const allCountries = await fetchService.fetchAllCountries();
        return res.status(200).json(allCountries);
    } catch (error) {
        next(error);
    }
}
const fetchAllUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = await fetchService.fetchAllUsers(page, limit);
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

const fetchAllUserById = async (req, res, next) => {
    try {
        const { User_Id } = req.params;
        const user = await fetchService.fetchAllUserById(User_Id);
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}


module.exports = { fetchAllSubjects, fetchAllGenders, fetchAllCities, fetchAllCountries, fetchAllUsers, fetchAllUserById };
