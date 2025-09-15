const { Users, UserRoles, Roles, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SendMail = require('../utils/sendEmail');
const AppError = require('../utils/AppError');

const register = async (data) => {
    const t = await sequelize.transaction();
    try {
        const { User_Name, First_Name, Last_Name, Email, Phone_Number, Password, Role_Id } = data;

        const isUserExists = await Users.findOne({ where: { Email: Email.toLowerCase() }, transaction: t });
        if (isUserExists) throw new AppError("User Already Exists", 400);

        const isRoleExist = await Roles.findOne({ where: { Role_Id }, transaction: t });
        if (!isRoleExist) throw new AppError("Role not Found", 404);
        if (isRoleExist.Role_Name === "Admin") throw new AppError("Cannot Register as Admin", 400);

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = await Users.create({
            User_Name, First_Name, Last_Name, Email, Phone_Number, Password: hashedPassword
        }, { transaction: t });

        await UserRoles.create({ User_Id: newUser.User_Id, Role_Id }, { transaction: t });

        const otp = Math.floor(1000 + Math.random() * 9000);
        newUser.verificationToken = otp.toString();
        newUser.verificationTokenExpires = Date.now() + 10 * 60 * 1000;
        await newUser.save({ transaction: t });

        await t.commit();
        await SendMail(newUser.Email, newUser.User_Name, otp);

        return { message: "User registered. Please check your email for the OTP code." };
    } catch (error) {
        await t.rollback();
        throw error; 
    }
};

const login = async (data) => {
    const { Email, Password } = data;
    const user = await Users.findOne({
        where: { Email: Email.toLowerCase() },
        include: [
            {
                model: UserRoles,
                as: "userroles",
                include: [{ model: Roles, as: "role" }]
            }
        ]
    });

    if (!user) throw new AppError("Invalid credentials", 401);

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) throw new AppError("Invalid credentials", 401);
    if (!user.isVerified) throw new AppError("Verify your account first then try to login", 403);

    const roleName = user.userroles[0].role.Role_Name;
    const token = jwt.sign(
        { id: user.User_Id, email: user.Email, role: roleName },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    return { message: "Login successful", token, user: { User_Id: user.User_Id, role: roleName } };
};

const verifyEmail = async (data) => {
    const t = await sequelize.transaction();
    try {
        const { otp } = data;
        const user = await Users.findOne({ where: { verificationToken: otp }, transaction: t });
        if (!user) throw new AppError("Invalid OTP", 400);
        if (user.verificationTokenExpires < Date.now()) throw new AppError("OTP expired", 400);

        user.isVerified = true;
        user.Status = "Active";
        user.verificationToken = null;
        user.verificationTokenExpires = null;
        await user.save({ transaction: t });

        await t.commit();

        return { message: "Email verified successfully. You can now login." };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = { register, login, verifyEmail };
