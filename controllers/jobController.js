const jobService = require("../services/jobService");

const getJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getJobs();
    return res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    return res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

const addJob = async (req, res, next) => {
  try {
    const jobData = {
      job: req.body.job,
      userDetails: req.body.userDetails,
      address: req.body.address,
      educationDetails: req.body.educationDetails,
      profilePicture: req.file ? req.file.filename : null,
    };
    const job = await jobService.addJob(jobData);
    return res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};



module.exports = {
  getJobs,
  getJobById,
  addJob,
};
