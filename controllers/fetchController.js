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


module.exports = { fetchAllSubjects, fetchAllGenders, fetchAllCities, fetchAllCountries };
