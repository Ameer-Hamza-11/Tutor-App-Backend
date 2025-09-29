const { Jobs, Users, Subjects, Statuses, Address, UserDetails, EducationDetails, sequelize } = require("../models");
const AppError = require("../utils/AppError");
const { sendJobNotification } = require("./notificationService");

const getJobs = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    const { rows, count } = await Jobs.findAndCountAll({
        include: [
            {
                model: Users,
                as: "student",
                attributes: {
                    exclude: [
                        "Password",
                        "isVerified",
                        "verificationToken",
                        "verificationTokenExpires",
                    ],
                },
                include: [{ model: UserDetails, as: "userdetails" }],
            },
            { model: Subjects, as: "subject" },
            { model: Statuses, as: "status" },
        ],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });

    return {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: rows, 
    };
};


const getJobById = async (jobId) => {
    const job = await Jobs.findByPk(jobId, {
        include: [
            {
                model: Users, as: "student", attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] },
                include: [
                    { model: UserDetails, as: "userdetails" }
                ]
            },
            { model: Subjects, as: "subject" },
            { model: Statuses, as: "status" },
        ],
    });

    if (!job) throw new AppError("Job not found", 404);
    return job;
};


const getProfileByUserId = async (userId) => {
    try {
        const profile = await Users.findOne({
            where: { User_Id: userId },
            attributes: {
                exclude: [
                    "Password",
                    "isVerified",
                    "verificationToken",
                    "verificationTokenExpires",
                ],
            },
            include: [
                {
                    model: UserDetails,
                    as: "userdetails",
                    include: [
                        {
                            model: Address,
                            as: "address",
                            include: ["city", "country"], 
                        },
                        { model: sequelize.models.Genders, as: "gender" },
                    ],
                },
                {
                    model: EducationDetails,
                    as: "educationdetails",
                },
            ],
        });

        if (!profile) throw new AppError("Profile not found", 404);
        return profile;
    } catch (error) {
        console.error("🔥 getProfileByUserId error:", error);
        throw error;
    }
};



const addJob = async (jobData) => {
    // Debug log
    console.log("📦 Raw Backend Payload:", jobData);

    // Parse JSON strings coming from FormData
    const job = typeof jobData.job === "string" ? JSON.parse(jobData.job) : jobData.job;
    const userDetails = typeof jobData.userDetails === "string" ? JSON.parse(jobData.userDetails) : jobData.userDetails;
    const address = typeof jobData.address === "string" ? JSON.parse(jobData.address) : jobData.address;

    // EducationDetails array parse karna
    let educationDetails = [];
    if (jobData.educationDetails) {
        if (Array.isArray(jobData.educationDetails)) {
            educationDetails = jobData.educationDetails.map((e) =>
                typeof e === "string" ? JSON.parse(e) : e
            );
        } else {
            educationDetails = [JSON.parse(jobData.educationDetails)];
        }
    }

    const profilePicture = jobData.profilePicture;

    console.log("✅ Parsed job.Student_Id:", job.Student_Id);

    const transaction = await sequelize.transaction();
    try {
    
        const student = await Users.findOne({
            where: { User_Id: job.Student_Id },
            transaction,
        });
        if (!student) throw new AppError("Invalid Student_Id", 400);

        const subject = await Subjects.findByPk(job.Subject_Id, { transaction });
        if (!subject) throw new AppError("Invalid Subject_Id", 400);


        const status = await Statuses.findByPk(job.Status || 5, { transaction });
        if (!status) throw new AppError("Invalid Status", 400);


        const newJob = await Jobs.create(job, { transaction });



        let newAddress = null;
        if (address) {
            newAddress = await Address.create(address, { transaction });
        }

        const { Profile_Picture, ...rest } = userDetails;
        const newUserDetails = await UserDetails.create(
            {
                ...rest,
                User_Id: job.Student_Id,  
                Address_Id: newAddress ? newAddress.Address_Id : null,
                Profile_Picture: profilePicture,
            },
            { transaction }
        );

        if (educationDetails && educationDetails.length > 0) {
            for (const edu of educationDetails) {
                await EducationDetails.create(
                  {
                    ...edu,
                    Start_Year: edu.Start_Year ? Number(edu.Start_Year) : null,
                    End_Year: edu.End_Year ? Number(edu.End_Year) : null,
                    User_Id: newUserDetails?.User_Id || job.Student_Id,
                  },
                  { transaction }
                );
              }
        }



        await transaction.commit();
        await sendJobNotification(newJob, subject);
        return { newJob, newUserDetails, newAddress };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};





module.exports = {
    getJobs,
    getJobById,
    getProfileByUserId,
    addJob,
};
