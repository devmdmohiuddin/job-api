const router = require("express").Router();

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJod,
  deleteJob,
} = require("../controllers/jobController");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:jobID").get(getSingleJob).patch(updateJod).delete(deleteJob);

module.exports = router;
