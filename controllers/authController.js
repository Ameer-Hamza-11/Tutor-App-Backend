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

module.exports = { register, login, verifyEmail };
