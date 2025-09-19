const express = require("express");
const router = express.Router();
const {
    scheduleDemo,
    getDemoById,
    getAllDemos,
    deleteDemoById,
    approveDemoById
} = require("../controllers/demoScheduleController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");

router.use(auth_middleware);


router.post("/", authorizeRoles("Admin"), scheduleDemo);

router.get("/request", authorizeRoles("Admin", "Student"), getAllDemos);

router.get("/:demoId", authorizeRoles("Admin", "Student"), getDemoById);

router.delete('/:demoId', authorizeRoles("Admin"), deleteDemoById);

router.post('/:demoId', authorizeRoles("Admin", "Student"), approveDemoById);

module.exports = router;
