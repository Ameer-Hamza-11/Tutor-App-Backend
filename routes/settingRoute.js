const express = require("express");
const router = express.Router();
const { editProfile, updateRole, changePassword, deleteAccount } = require("../controllers/settingController");
const auth_middleware = require("../middlewares/verify_token");
const { pictureUpload } = require("../middlewares/upload");


router.use(auth_middleware)

router.patch("/edit-profile", pictureUpload.single('Profile_Picture'), editProfile);
router.patch("/update-role", updateRole);
router.patch("/change-password", changePassword);
router.delete("/delete-account", deleteAccount);

module.exports = router;
