const express = require("express");
const router = express.Router();
const {
    fetchAllUsers,
    fetchAllUserById,
    fetchAllSubjects,
    fetchAllGenders,
    fetchAllCities,
    fetchAllCountries
} = require("../controllers/fetchController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");



router.use(auth_middleware);
//! Only Admin can access these routes
router.route("/users").get(authorizeRoles("Admin"), fetchAllUsers)
router.route("/users/:User_Id").get(authorizeRoles("Admin"), fetchAllUserById)

//? Student and Admin can access these routes
router.route("/subjects").get(fetchAllSubjects)
router.route("/genders").get(fetchAllGenders)
router.route("/cities").get(fetchAllCities)
router.route("/countries").get(fetchAllCountries)





module.exports = router;
