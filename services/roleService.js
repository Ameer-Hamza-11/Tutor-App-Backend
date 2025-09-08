const { Roles } = require("../models");
const AppError = require("../utils/AppError");

const getRoles = async () => {
  const roles = await Roles.findAll({ where: { Is_Active: true } });
  if (!roles || roles.length === 0) throw new AppError("No roles found", 404);
  return roles;
};

const getRoleById = async (roleId) => {
  const role = await Roles.findByPk(roleId);
  if (!role) throw new AppError("Role not found", 404);
  return role;
};

const addRole = async (roleData) => {
  const existing = await Roles.findOne({ where: { Role_Name: roleData.Role_Name } });
  if (existing) throw new AppError("Role already exists", 400);

  return await Roles.create(roleData);
};

const updateRole = async (roleId, roleData) => {
  const role = await Roles.findByPk(roleId);
  if (!role) throw new AppError("Role not found", 404);

  await role.update(roleData);
  return role;
};

module.exports = {
  getRoles,
  getRoleById,
  addRole,
  updateRole,
};
