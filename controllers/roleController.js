const roleService = require("../services/roleService");

const getRoles = async (req, res, next) => {
  try {
    const roles = await roleService.getRoles();
    return res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

const getRoleById = async (req, res, next) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    return res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

const addRole = async (req, res, next) => {
  try {
    const role = await roleService.addRole(req.body);
    return res.status(201).json(role);
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    return res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoles,
  getRoleById,
  addRole,
  updateRole,
};
