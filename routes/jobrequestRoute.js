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

router.get(
    "/",
    authorizeRoles("Admin"),
    jobRequestController.getAllJobRequests
);

router.get(
    "/:jobId",
    authorizeRoles("Admin"),
    jobRequestController.getJobRequestsByJobId
);

router.delete(
    "/:id",
    authorizeRoles("Admin"),
    jobRequestController.deleteJobRequest
);

module.exports = router;
