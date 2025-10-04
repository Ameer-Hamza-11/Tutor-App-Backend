const settingService = require("../services/settingService");

const editProfile = async (req, res, next) => {
    try {
      console.log("req.body ===>", req.body);
      console.log("req.files ===>", req.files);
  
      if (req.files?.Profile_Picture) {
        req.body.Profile_Picture = req.files.Profile_Picture[0].filename;
      }
  
      if (req.files?.Documents) {
        req.body.Documents = req.files.Documents.map(f => f.filename);
      }
  
      const result = await settingService.editProfile(req.body, req.user.role);
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
