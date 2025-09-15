const { Jobs, Users, Subjects, Statuses, Address, UserDetails, EducationDetails, UserSubjects, sequelize } = require("../models");
const AppError = require("../utils/AppError");

const getJobs = async () => {
    const jobs = await Jobs.findAll({
        include: [
            {
                model: Users, as: "student", attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] },
                include: [
                    { model: UserDetails, as: "userdetails" }
                ]
            },
            { model: Subjects, as: "subject" },
            { model: Statuses, as: "status" },
        ]
    });

    if (!jobs || jobs.length === 0) throw new AppError("No jobs found", 404);
    return jobs;
};

const getJobById = async (jobId) => {
    const job = await Jobs.findByPk(jobId, {
        include: [
            { model: Users, as: "student", attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] } },
            { model: Subjects, as: "subject" },
            { model: Statuses, as: "status" },
        ],
    });

    if (!job) throw new AppError("Job not found", 404);
    return job;
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
        // 👇 ab Student_Id undefined nahi hoga
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
                User_Id: job.Student_Id,  // ✅ ye zaroori hai
                Address_Id: newAddress ? newAddress.Address_Id : null,
                Profile_Picture: profilePicture,
            },
            { transaction }
        );

        if (educationDetails && educationDetails.length > 0) {
            for (const edu of educationDetails) {
                await EducationDetails.create(
                    { ...edu, User_Id: newUserDetails?.User_Id || job.Student_Id },
                    { transaction }
                );
            }
        }

        await UserSubjects.create({
            User_Id: newUserDetails?.User_Id || job.Student_Id,
            Subject_Id: subject.Subject_Id
        }, { transaction })

        await transaction.commit();
        return { newJob, newUserDetails, newAddress };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = {
    getJobs,
    getJobById,
    addJob,
};
