const { Users, UserRoles, Roles, sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SendMail = require('../utils/sendEmail');
const AppError = require('../utils/AppError');
const verifyEmailTemplate = require('../templates/verifyEmailTemplate');
const resendOtpTemplate = require('../templates/resendOtpTemplate');
const resetPasswordTemplate = require('../templates/resetPasswordTemplate');

const register = async (data) => {
    const t = await sequelize.transaction();
    try {
        const { User_Name, First_Name, Last_Name, Email, Phone_Number, Password, Role_Id } = data;

        const isUserExists = await Users.findOne({ where: { Email: Email.toLowerCase() }, transaction: t });
        if (isUserExists) throw new AppError("User Already Exists", 400);

        const isRoleExist = await Roles.findOne({ where: { Role_Id }, transaction: t });
        if (!isRoleExist) throw new AppError("Role not Found", 404);
        if (isRoleExist.Role_Name === "Admin") throw new AppError("Cannot Register as Admin", 400);
        if (!Password || Password.length < 6) {
            throw new AppError("Password must be at least 6 characters long", 400);
        }
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
        await SendMail({
            to: newUser.Email,
            subject: "Verify your email with OTP",
            html: verifyEmailTemplate(newUser.User_Name, otp)
        });

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

    const roleName = user.userroles?.[0]?.role?.Role_Name || "Student";
    const token = jwt.sign(
        { id: user.User_Id, email: user.Email, role: roleName },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );

    return {
        message: "Login successful", token, user: {
            User_Id: user.User_Id,
            User_Name: user.User_Name,
            First_Name: user.First_Name,
            Last_Name: user.Last_Name,
            Email: user.Email,
            Phone_Number: user.Phone_Number,
            role: roleName
        }
    };
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

const resendEmail = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { Email } = data;
        const user = await Users.findOne({ where: { Email: Email.toLowerCase() }, transaction });
        if (!user) throw new AppError("User not found", 404);
        if (user.isVerified) throw new AppError("User already verified", 400);

        const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
        user.verificationToken = otp.toString();
        user.verificationTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        await user.save({ transaction });

        await transaction.commit();
        await SendMail({
            to: user.Email,
            subject: "Resend OTP - Verify your email",
            html: resendOtpTemplate(user.User_Name, otp)
        });
        return { success: true, message: "OTP resent. Please check your email." };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}
const forgotPassword = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { Email } = data;
        if (!Email) throw new AppError("Email is required", 400);
        const user = await Users.findOne({ where: { Email: Email.toLowerCase() }, transaction });
        if (!user) throw new AppError("User not found", 404);
        if (!user.isVerified) throw new AppError("Verify your email first before resetting password", 400);

        const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
        user.verificationToken = otp.toString();
        user.verificationTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
        await user.save({ transaction });
        await transaction.commit();

        await SendMail({
            to: user.Email,
            subject: "🔐 Password Reset OTP",
            html: resetPasswordTemplate(user.User_Name, otp)
        });

        return { message: "Password reset OTP sent to your email." };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const resetPassword = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { otp, newPassword } = data;
        if (!newPassword || newPassword.length < 6) {
            throw new AppError("Password must be at least 6 characters long", 400);
        }
        const user = await Users.findOne({ where: { verificationToken: otp }, transaction });
        if (!user) throw new AppError("Invalid OTP", 400);
        if (user.verificationTokenExpires < Date.now()) throw new AppError("OTP expired", 400);

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.Password = hashedPassword;
        user.verificationToken = null;
        user.verificationTokenExpires = null;
        await user.save({ transaction });
        await transaction.commit();

        return { message: "Password reset successful. You can now login with your new password." };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const editUser = async (data) => {
    const t = await sequelize.transaction();
    try {
        const { UserId, User_Name, First_Name, Last_Name, Phone_Number, Role_Id } = data;
        if (!UserId) throw new AppError("UserId is required", 400);

        const user = await Users.findByPk(UserId, { transaction: t });
        if (!user) throw new AppError("User not found", 404);

        if (User_Name) user.User_Name = User_Name;
        if (First_Name) user.First_Name = First_Name;
        if (Last_Name) user.Last_Name = Last_Name;
        if (Phone_Number) user.Phone_Number = Phone_Number;
        await user.save({ transaction: t });

        // 👇 Role update kare UserRoles me
        if (Role_Id) {
            const userRole = await UserRoles.findOne({ where: { User_Id: UserId }, transaction: t });
            if (userRole) {
                await userRole.update({ Role_Id }, { transaction: t });
            } else {
                await UserRoles.create({ User_Id: UserId, Role_Id }, { transaction: t });
            }
        }

        await t.commit();
        return {
            message: "User updated successfully",
            user: {
                User_Id: user.User_Id,
                User_Name: user.User_Name,
                First_Name: user.First_Name,
                Last_Name: user.Last_Name,
                Email: user.Email,
                Phone_Number: user.Phone_Number,
                Role_Id
            }
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};


const deleteUser = async (data) => {
    const t = await sequelize.transaction();
    try {
        const { UserId } = data;
        if (!UserId) throw new AppError("UserId is required", 400);

        const user = await Users.findByPk(UserId, { transaction: t });
        if (!user) throw new AppError("User not found", 404);

        await user.destroy({ transaction: t });
        await t.commit();

        return { message: "User deleted successfully" };
    } catch (error) {
        await t.rollback();
        throw error;
    }
}



module.exports = { register, login, verifyEmail, resendEmail, forgotPassword, resetPassword, editUser, deleteUser };
