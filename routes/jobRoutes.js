const router = require("express").Router();
const protected = require("../middleware/authMiddleware");

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.route("/").get(protected, getAllJobs).post(protected, createJob);
router
  .route("/:id")
  .get(protected, getSingleJob)
  .patch(protected, updateJob)
  .delete(protected, deleteJob);

module.exports = router;
