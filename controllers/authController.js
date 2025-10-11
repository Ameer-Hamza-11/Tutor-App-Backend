const authService = require("../services/authService");
// const AppError = require("../utils/AppError");

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const result = await authService.verifyEmail(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


const resendEmail = async (req, res, next) => {
  try {
    const result = await authService.resendEmail(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error)
  }
}

const editUser = async (req, res, next) => {
  try {
    const result = await authService.editUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const result = await authService.deleteUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

const updateFcmToken = async (req, res, next) => {
  try {
    const { fcmToken } = req.body;
    if (!fcmToken) {
      return res.status(400).json({ message: "FCM token is required" });
    }

    const userId = req.user?.id || req.user?.User_Id; 
    const result = await authService.updateFcmToken(userId, fcmToken);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, verifyEmail, resendEmail, forgotPassword, resetPassword, editUser, deleteUser,updateFcmToken };
