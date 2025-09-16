const express = require("express");
const router = express.Router();
const {
  scheduleDemo,
  getDemosByRequestId,
} = require("../controllers/demoScheduleController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.use(auth_middleware);

// Only Admin can schedule demos
router.post("/", authorizeRoles("Admin"), scheduleDemo);

// Get demos by JobRequest
router.get("/request/:requestId", authorizeRoles("Admin", "Teacher", "Student"), getDemosByRequestId);

module.exports = router;
