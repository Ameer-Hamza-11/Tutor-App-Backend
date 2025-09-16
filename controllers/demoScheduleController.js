const demoService = require("../services/demoScheduleService");

const scheduleDemo = async (req, res, next) => {
  try {
    const demoData = {
      Request_Id: req.body.Request_Id,
      Scheduled_DateTime: req.body.Scheduled_DateTime,
    };

    const demo = await demoService.scheduleDemo(demoData);
    return res.status(201).json(demo);
  } catch (error) {
    next(error);
  }
};

const getDemosByRequestId = async (req, res, next) => {
  try {
    const demos = await demoService.getDemosByRequestId(req.params.requestId);
    return res.status(200).json(demos);
  } catch (error) {
    next(error);
  }
};

module.exports = { scheduleDemo, getDemosByRequestId };
