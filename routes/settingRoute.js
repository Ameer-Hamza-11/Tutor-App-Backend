const express = require("express");
const router = express.Router();
const { editProfile, updateRole, changePassword, deleteAccount } = require("../controllers/settingController");
const auth_middleware = require("../middlewares/verify_token");
const { upload } = require("../middlewares/upload");


router.use(auth_middleware)

router.post("/edit-profile", upload.fields([
    { name: "Profile_Picture", maxCount: 1 },
    { name: "Documents", maxCount: 5 }
]), editProfile);
router.patch("/update-role", updateRole);
router.patch("/change-password", changePassword);
router.delete("/delete-account", deleteAccount);

module.exports = router;
