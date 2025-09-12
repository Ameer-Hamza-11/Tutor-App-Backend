const express = require("express");
const router = express.Router();
const {
    getJobs,
    getJobById,
    addJob
} = require("../controllers/jobController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");


router.use(auth_middleware, authorizeRoles("Admin", "Student"));

router.route("/").get(getJobs).post(addJob);

router.route("/:id").get(getJobById)


module.exports = router;
