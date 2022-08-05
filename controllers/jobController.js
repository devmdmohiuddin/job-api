const { StatusCodes } = require("http-status-codes");
const Job = require("../models/jobModel");
const { NotFound } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user._id }).sort("createdAt");
  res
    .status(StatusCodes.OK)
    .json({ status: "success", jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId, createdBy: req.user._id });

  if (!job) {
    throw new NotFound(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ status: "success", data: { job } });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user._id;

  const createdJob = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    data: {
      createdJob,
    },
  });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(
    {
      _id: jobId,
      createdBy: req.user._id,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedJob) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ status: "success", data: { updatedJob } });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  console.log(jobId)

  const deletedJob = await Job.findByIdAndDelete({
    _id: jobId,
    createdBy: req.user._id,
  });

  if (!deletedJob) {
    throw new NotFound(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
