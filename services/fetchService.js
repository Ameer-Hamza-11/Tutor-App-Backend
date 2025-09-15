const { Subjects, Genders, Cities, Countries } = require('../models');
const AppError = require("../utils/AppError");


const fetchAllSubjects = async () => {
    const allSubjects = await Subjects.findAll();
    if (!allSubjects || allSubjects.length === 0) {
        throw new AppError("No subjects found", 404);
    }
    return allSubjects;
}

const fetchAllGenders = async () => {
    const allGenders = await Genders.findAll();
    if (!allGenders || allGenders.length === 0) {
        throw new AppError("No gender found or invalid gender", 404);
    }
    return allGenders;
}

const fetchAllCities = async () => {
    const allCities = await Cities.findAll();
    if (!allCities || allCities.length === 0) {
        throw new AppError("No gender found or invalid gender", 404);
    }
    return allCities;
}

const fetchAllCountries = async () => {
    const allCountries = await Countries.findAll();
    if (!allCountries || allCountries.length === 0) {
        throw new AppError("No gender found or invalid gender", 404);
    }
    return allCountries;
}




module.exports = { fetchAllSubjects, fetchAllGenders, fetchAllCities, fetchAllCountries }


