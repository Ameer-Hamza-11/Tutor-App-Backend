const { Users, UserDetails, Address, UserRoles, Roles } = require("../models");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");

const editProfile = async (data) => {
    const {
        UserId,
        First_Name,
        Last_Name,
        Phone_Number,
        Date_Of_Birth,
        Gender_Id,
        Additional_Info,
        Description,
        Profile_Picture,
        AddressLine1,
        AddressLine2,
        City_Id,
        Country_Id,
        Postal_Code,
    } = data;

    if (!UserId) throw new AppError("UserId is required", 400);

    // Step 1: Find User
    const user = await Users.findByPk(UserId, {
        include: [
            { model: UserDetails, as: "userdetails" },
        ],
    });

    if (!user) throw new AppError("User not found", 404);

    // Step 2: Update Users table
    await user.update({
        First_Name: First_Name || user.First_Name,
        Last_Name: Last_Name || user.Last_Name,
        Phone_Number: Phone_Number || user.Phone_Number,
    });

    // Step 3: Update UserDetails (if exists otherwise create)
    let userDetail = await UserDetails.findOne({ where: { User_Id: UserId } });

    if (userDetail) {
        // Update existing details
        await userDetail.update({
            Date_Of_Birth,
            Gender_Id,
            Additional_Info,
            Description,
            Profile_Picture,
        });
    } else {
        // Create if not exist
        userDetail = await UserDetails.create({
            User_Id: UserId,
            Date_Of_Birth,
            Gender_Id,
            Additional_Info,
            Description,
            Profile_Picture: Profile_Picture || userDetail.Profile_Picture,
        });
    }

    // Step 4: Address handle
    if (AddressLine1 || City_Id) {
        let address;
        if (userDetail.Address_Id) {
            address = await Address.findByPk(userDetail.Address_Id);
            if (address) {
                await address.update({
                    AddressLine1,
                    AddressLine2,
                    City_Id,
                    Country_Id,
                    Postal_Code,
                });
            }
        } else {
            address = await Address.create({
                AddressLine1,
                AddressLine2,
                City_Id,
                Country_Id,
                Postal_Code,
            });
            // Link with UserDetails
            await userDetail.update({ Address_Id: address.Address_Id });
        }
    }

    return { message: "Profile updated successfully" };
};


const updateRole = async (data) => {
    try {
        const { UserId, Role_Id } = data;
        if (!UserId || !Role_Id) throw new AppError("UserId and Role_Id are required", 400);

        // Find User
        const user = await Users.findByPk(UserId);
        if (!user) throw new AppError("User not found", 404);

        const role = await Roles.findByPk(Role_Id);
        if (!role) throw new AppError("Role not found", 404);


        const userRole = await UserRoles.findOne({ where: { User_Id: UserId } });
        if (userRole) {
            await userRole.update({ Role_Id });
        } else {
            await UserRoles.create({ User_Id: UserId, Role_Id });
        }
        return { message: "Role updated successfully" };

    } catch (error) {
        throw error;
    }
}


const changePassword = async (data) => {
    try {
        const { UserId, Old_Password, New_Password } = data;
        if (!UserId || !Old_Password || !New_Password) throw new AppError("UserId, Old_Password and New_Password are required", 400);

        // Find User
        const user = await Users.findByPk(UserId);
        if (!user) throw new AppError("User not found", 404);

        // Check old password
        const isMatch = await bcrypt.compare(Old_Password, user.Password);
        if (!isMatch) throw new AppError("Old password is incorrect", 400);
        const hashedPassword = await bcrypt.hash(New_Password, 10);

        // Update Password
        user.Password = hashedPassword;
        await user.save();

        return { message: "Password changed successfully" };

    } catch (error) {
        throw error;
    }
}


const deleteAccount = async (data) => {
    try {
        const { UserId } = data;
        if (!UserId) throw new AppError("UserId is required", 400);

        // Find User
        const user = await Users.findByPk(UserId);
        if (!user) throw new AppError("User not found", 404);

        // Delete User (soft delete or hard delete based on your requirement)
        await user.destroy();

        return { message: "Account deleted successfully" };

    } catch (error) {
        throw error;
    }
}

module.exports = { editProfile, updateRole, changePassword, deleteAccount };
