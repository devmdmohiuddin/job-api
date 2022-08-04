const getAllJobs = (req, res) => {
  res.send("All jobs");
};

const getSingleJob = (req, res) => {
  res.send("Single job");
};

const createJob = (req, res) => {
  res.send("Create job");
};

const updateJod = (req, res) => {
  res.send("Update job");
};

const deleteJob = (req, res) => {
  res.send("Delete job");
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJod,
  deleteJob,
};
