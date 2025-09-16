const express = require("express");
const router = express.Router();
const {
    getJobs,
    getJobById,
    getProfileByUserId,
    addJob
} = require("../controllers/jobController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");

const pictureUpload = require("../middlewares/upload").pictureUpload;

router.use(auth_middleware);

router.route("/")
    .post(authorizeRoles("Student", "Admin"), pictureUpload.single("Profile_Picture"), addJob)
    .get(authorizeRoles("Teacher", "Admin"), getJobs);


router.route("/:id")
    .get(
        authorizeRoles("Teacher", "Admin"),
        getJobById
    );
router.route("/profile/:id")
    .get(getProfileByUserId);






module.exports = router;
