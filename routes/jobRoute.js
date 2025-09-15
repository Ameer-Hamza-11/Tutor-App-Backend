const express = require("express");
const router = express.Router();
const {
    getJobs,
    getJobById,
    addJob
} = require("../controllers/jobController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");

const pictureUpload = require("../middlewares/upload").pictureUpload;

router.use(auth_middleware);


router.route("/").post(authorizeRoles("Admin", "Student"), pictureUpload.single("Profile_Picture"), addJob);
router.route("/").get(authorizeRoles("Admin", "Teacher"), getJobs)
router.route("/:id").get(authorizeRoles("Admin", "Teacher"), getJobById)


module.exports = router;
