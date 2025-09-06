const { Users, UserRoles, Roles } = require('../models');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const SendMail = require('../utils/sendEmail');




const register = async (req, res) => {
    try {
        const { User_Name, First_Name, Last_Name, Email, Phone_Number, Password, Role_Id } = req.body;
        const isUserExists = await Users.findOne({ where: { Email: Email.toLowerCase() } })

        if (isUserExists) {
            return res.status(400).json({ message: 'User Already Exists' })
        }

        const isRoleExist = await Roles.findOne({ where: { Role_Id } })
        if (!isRoleExist) {
            return res.status(404).json({ message: 'Role Not Found' });
        }

        if (isRoleExist.Role_Name === 'Admin') {
            return res.status(400).json({ message: 'Cannot Register As Admin' })
        }

        const hashedPassword = await bcrypt.hash(Password, 10)
        const newUser = await Users.create({
            User_Name, First_Name, Last_Name, Email, Phone_Number, Password: hashedPassword
        })

        const userRole = await UserRoles.create({
            User_Id: newUser.User_Id,
            Role_Id
        })
        await userRole.save()

        const otp = Math.floor(1000 + Math.random() * 9000);
        newUser.verificationToken = otp.toString();
        newUser.verificationTokenExpires = Date.now() + 10 * 60 * 1000;
        await newUser.save()





        await SendMail(newUser.Email, newUser.User_Name, otp)


        return res.status(201).json({
            message: "User registered. Please check your email for the OTP code."
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error while registration', error: error.message })
    }
}


const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await Users.findOne({
            where: { Email: Email.toLowerCase() },
            include: [
                {
                    model: UserRoles,
                    as: 'userroles',
                    include: [
                        {
                            model: Roles,
                            as: 'role'
                        }
                    ]
                }
            ]
        });
        if (!user) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Verify Your account first then try to login' })
        }
        const rolenName = user.userroles[0].role.Role_Name;
        const token = jwt.sign(
            { id: user.User_Id, email: user.Email, role: rolenName },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );
        return res.json({ message: "Login successful", token, user: { id: user.User_Id, role: rolenName } });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
}





const verifyEmail = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await Users.findOne({ where: { verificationToken: otp } });
        if (!user) {
            return res.status(400).json({ message: "Invalid OTP" })
        }

        if (user.verificationTokenExpires < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }
        user.isVerified = true;
        user.Status = 'Active';
        user.verificationToken = null;
        user.verificationTokenExpires = null;
        await user.save()
        return res.json({ message: "Email verified successfully. You can now login." });
    } catch (error) {
        return res.status(500).json({ message: "Error verifying email", error: error.message });
    }

}

module.exports = { register, login, verifyEmail }