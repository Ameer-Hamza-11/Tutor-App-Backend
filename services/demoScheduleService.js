const { DemoSchedules, JobRequests, Statuses, Jobs, Users, sequelize, TutorAssignments } = require("../models");
const AppError = require("../utils/AppError");

const scheduleDemo = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { Request_Id, Scheduled_DateTime } = data;

        // Check if JobRequest exists
        const request = await JobRequests.findByPk(Request_Id);
        if (!request) throw new AppError("Invalid Request_Id", 400);

        // Default status = 13 (Scheduled)
        const status = await Statuses.findByPk(13);
        if (!status) throw new AppError("Invalid Status", 400);

        const demo = await DemoSchedules.create({
            Request_Id,
            Scheduled_DateTime,
            Status: status.Status_Id,
        }, { transaction });

        await request.update({ Status: 10 }, { transaction });
        await transaction.commit();
        return demo;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
const getAllDemos = async () => {
    const [demos] = await sequelize.query("SELECT * FROM demo_schedules_view");

    if (!demos || demos.length === 0) {
        throw new AppError("No demo schedules found", 404);
    }

    const now = new Date();
    for (let demo of demos) {
        // Correct property name
        console.log("Demo Status:", demo.DemoStatus, typeof demo.DemoStatus);
        console.log("Scheduled_DateTime:", demo.Scheduled_DateTime, "Now:", now);

        if (Number(demo.DemoStatus) === 13 && new Date(demo.Scheduled_DateTime) < now) {
            await DemoSchedules.update(
                { Status: 14 }, // Completed
                { where: { Demo_Id: demo.Demo_Id } }
            );
            demo.DemoStatus = 14; // frontend ke liye update
        }
    }

    return demos;
};





const getDemoById = async (Demo_Id) => {
    const demo = await DemoSchedules.findOne({
        where: { Demo_Id },
        include: [
            {
                model: JobRequests, as: "jobrequest", include: [
                    {
                        model: Jobs, as: "job", include: [
                            { model: Users, as: "student", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] }
                        ]
                    },
                    { model: Users, as: "tutor", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] },
                ]
            },
            { model: Statuses, as: "status" },
        ],
    });

    if (!demo) throw new AppError("No demo schedule found for this id", 404);
    return demo;
};
const deleteDemoById = async (Demo_Id) => {
    const demo = await DemoSchedules.findByPk(Demo_Id);
    if (!demo) throw new AppError("Demo schedule not found", 404);

    await demo.destroy();
    return { message: "Demo schedule deleted successfully" };
}

const approveDemoById = async (Demo_Id, assignment) => {
    const transaction = await sequelize.transaction();
    try {

        const demo = await DemoSchedules.findOne({
            where: { Demo_Id },
            include: [
                {
                    model: JobRequests, as: "jobrequest", include: [
                        {
                            model: Jobs, as: "job", include: [
                                { model: Users, as: "student", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] }
                            ]
                        },
                        { model: Users, as: "tutor", attributes: ["User_Id", "User_Name", "First_Name", "Last_Name", "Email"] },
                    ]
                },
                { model: Statuses, as: "status" },
            ],
        }, { transaction });
        if (!demo) throw new AppError("Demo schedule not found", 404);
        const { Start_Date, End_Date } = assignment;
        if (!Start_Date || !End_Date) {
            throw new AppError("Start_Date and End_Date are required to approve demo", 400);
        }
        if (new Date(Start_Date) >= new Date(End_Date)) {
            throw new AppError("Start_Date must be before End_Date", 400);
        }


        await TutorAssignments.create({
            Job_Id: demo.jobrequest.Job_Id,
            Tutor_Id: demo.jobrequest.Tutor_Id,
            Student_Id: demo.jobrequest.job.Student_Id,
            Start_Date,
            End_Date,
        }, { transaction });


        await demo.update(
            { Status: 8 },
            { transaction }
        );
        await transaction.commit();
        return demo;
    } catch (error) {
        await transaction.rollback();
        throw error
    }
}

module.exports = { scheduleDemo, getDemoById, getAllDemos, deleteDemoById, approveDemoById };
