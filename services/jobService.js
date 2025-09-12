const { Jobs, Users, Subjects, Statuses, Address, UserDetails, EducationDetails, sequelize } = require("../models");
const AppError = require("../utils/AppError");

const getJobs = async () => {
    const jobs = await Jobs.findAll({
        include: [
            { model: Users, as: "student", attributes: { exclude: ['Password', 'isVerified', 'verificationToken', 'verificationTokenExpires'] } },
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
    const transaction = await sequelize.transaction();
    try {
        const { job, userDetails, address, educationDetails } = jobData;

        const student = await Users.findByPk(job.Student_Id, { transaction });
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

        let newUserDetails = null;
        if (userDetails) {
            newUserDetails = await UserDetails.create(
                { ...userDetails, Address_Id: newAddress ? newAddress.Address_Id : null },
                { transaction }
            );
        }


        if (educationDetails && educationDetails.length > 0) {
            for (const edu of educationDetails) {
                await EducationDetails.create(
                    { ...edu, User_Id: newUserDetails?.User_Id || job.Student_Id },
                    { transaction }
                );
            }
        }

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
