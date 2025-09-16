const { DemoSchedules, JobRequests, Statuses } = require("../models");
const AppError = require("../utils/AppError");

const scheduleDemo = async (data) => {
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
  });

  return demo;
};

const getDemosByRequestId = async (Request_Id) => {
  const demos = await DemoSchedules.findAll({
    where: { Request_Id },
    include: [
      { model: JobRequests, as: "jobrequest" },
      { model: Statuses, as: "status" },
    ],
  });

  if (!demos || demos.length === 0)
    throw new AppError("No demo schedules found for this request", 404);

  return demos;
};

module.exports = { scheduleDemo, getDemosByRequestId };
