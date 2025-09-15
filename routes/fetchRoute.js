const express = require("express");
const router = express.Router();
const {
    fetchAllSubjects,
    fetchAllGenders,
    fetchAllCities,
    fetchAllCountries
} = require("../controllers/fetchController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");



router.use(auth_middleware, authorizeRoles("Admin", "Student"));

router.route("/subjects").get(fetchAllSubjects)
router.route("/genders").get(fetchAllGenders)
router.route("/cities").get(fetchAllCities)
router.route("/countries").get(fetchAllCountries)





module.exports = router;
