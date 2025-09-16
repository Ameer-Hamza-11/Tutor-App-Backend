const jobRequestService = require("../services/jobRequestService");

const addJobRequest = async (req, res, next) => {
  try {
    const jobRequestData = {
      Job_Id: req.body.Job_Id,
      Tutor_Id: req.user.id, // ✅ logged in tutor ka id
    };

    const jobRequest = await jobRequestService.addJobRequest(jobRequestData);
    return res.status(201).json(jobRequest);
  } catch (error) {
    next(error);
  }
};

const getJobRequestsByJobId = async (req, res, next) => {
  try {
    const jobRequests = await jobRequestService.getJobRequestsByJobId(
      req.params.jobId
    );
    return res.status(200).json(jobRequests);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addJobRequest,
  getJobRequestsByJobId,
};
