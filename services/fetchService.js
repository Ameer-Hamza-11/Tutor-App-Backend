const { Subjects, Genders, Cities, Countries, Users, UserRoles, UserDetails, EducationDetails, Address } = require('../models');
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

const fetchAllUsers = async () => {
    const users = await Users.findAll({
        include: [
            { model: UserRoles, as: 'userroles' }
        ],
        attributes: { exclude: ['Password', 'verificationToken', 'verificationTokenExpires'] }
    })
    if (!users || users.length === 0) {
        throw new AppError("No users found", 404);
    }
    return users;
}

const fetchAllUserById = async (User_Id) => {
    const user = await Users.findByPk(User_Id, {
        include: [
            { model: UserRoles, as: 'userroles' },
            {
                model: UserDetails, as: 'userdetails',
                include: [
                    { model: Genders, as: 'gender' },
                    {
                        model: Address, as: 'address',
                        include:
                            [
                                { model: Cities, as: 'city' },
                                { model: Countries, as: 'country' }
                            ]
                    }
                ]
            },
            { model: EducationDetails, as: 'educationdetails' },
        ]
    });
    if (!user) {
        throw new AppError("No user found with this ID", 404);
    }
    return user;
}




module.exports = { fetchAllSubjects, fetchAllGenders, fetchAllCities, fetchAllCountries, fetchAllUsers, fetchAllUserById }


