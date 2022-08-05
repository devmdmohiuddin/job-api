const router = require("express").Router();
const protected = require("../middleware/authMiddleware")

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJod,
  deleteJob,
} = require("../controllers/jobController");

router.route("/").get(protected, getAllJobs).post(createJob);
router.route("/:jobID").get(getSingleJob).patch(updateJod).delete(deleteJob);

module.exports = router;
