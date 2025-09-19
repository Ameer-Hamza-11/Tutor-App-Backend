const { JobRequests, Jobs, Users, Statuses } = require("../models");
const AppError = require("../utils/AppError");

const addJobRequest = async (data) => {
    const { Job_Id, Tutor_Id } = data;

    const job = await Jobs.findByPk(Job_Id);
    if (!job) throw new AppError("Invalid Job_Id", 400);

    const tutor = await Users.findByPk(Tutor_Id);
    if (!tutor) throw new AppError("Invalid Tutor_Id", 400);

    const status = await Statuses.findByPk(3); // default Requested
    if (!status) throw new AppError("Invalid Status", 400);

    const jobRequest = await JobRequests.create({
        Job_Id,
        Tutor_Id,
    });

    return jobRequest;
};


const getAllJobRequests = async () => {
    try {
        const jobRequests = await JobRequests.findAll({
            where: { Status: 3 },
            include: [
                {
                    model: Jobs, as: "job", include: [
                        { model: Users, as: "student", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] }
                    ]
                },
                { model: Users, as: "tutor", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] },
                { model: Statuses, as: "status" },
            ],
        });

        if (!jobRequests || jobRequests.length === 0)
            throw new AppError("No job requests found", 404);
        return jobRequests;
    } catch (error) {
        console.log("Error in getAllJobRequests:", error);
        throw error;
    }
}

const getJobRequestsByJobId = async (jobId) => {
    const jobRequests = await JobRequests.findAll({
        where: { Job_Id: jobId },
        include: [
            {
                model: Jobs, as: "job", include: [
                    { model: Users, as: "student", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] }
                ]
            },
            { model: Users, as: "tutor", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] },
            { model: Statuses, as: "status" },
        ],
    });

    if (!jobRequests || jobRequests.length === 0)
        throw new AppError("No job requests found for this job", 404);

    return jobRequests;
};

const deleteJobRequest = async (id) => {
    const jobRequest = await JobRequests.findByPk(id);
    if (!jobRequest) throw new AppError("Job request not found", 404);

    await jobRequest.destroy();
    return { message: "Job request deleted successfully", jobRequest: id };
}

module.exports = {
    addJobRequest,
    getJobRequestsByJobId,
    getAllJobRequests,
    deleteJobRequest
};
