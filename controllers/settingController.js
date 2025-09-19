const settingService = require("../services/settingService");

const editProfile = async (req, res, next) => {
    try {
        console.log("req.body ===>", req.body);
        console.log("req.file ===>", req.file);
        if (req.file) {
            // yahan sirf file ka naam save hoga, pura path nahi
            req.body.Profile_Picture = req.file.filename;
        }
        const result = await settingService.editProfile(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const updateRole = async (req, res, next) => {
    try {
        const result = await settingService.updateRole(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const changePassword = async (req, res, next) => {
    try {
        const result = await settingService.changePassword(req.body);
        return res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const result = await settingService.deleteAccount(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

module.exports = { editProfile, updateRole, changePassword, deleteAccount };
