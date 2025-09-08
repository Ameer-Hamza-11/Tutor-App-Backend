const express = require("express");
const {
    getRoles,
    getRoleById,
    addRole,
    updateRole,
} = require("../controllers/roleController");

const auth_middleware = require("../middlewares/verify_token");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = express.Router();

router.use(auth_middleware, authorizeRoles("Admin"));

router.route("/").get(getRoles).post(addRole);
router.route("/:id").get(getRoleById).patch(updateRole);

module.exports = router;
