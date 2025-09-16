const express = require("express");
const router = express.Router();
const jobRequestController = require("../controllers/jobRequestController");
const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.use(auth_middleware);

// ✅ Tutor job request create karega
router.post(
    "/",
    authorizeRoles("Teacher", "Admin"),
    jobRequestController.addJobRequest
);

// ✅ Admin/Student apne job ke requests dekh sakte hain
router.get(
    "/:jobId",
    authorizeRoles("Student", "Admin"),
    jobRequestController.getJobRequestsByJobId
);

module.exports = router;
