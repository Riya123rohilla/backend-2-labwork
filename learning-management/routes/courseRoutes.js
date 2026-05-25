const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  enrollCourse
} = require("../controllers/courseController");

router.route("/")
  .post(protect, createCourse)
  .get(protect, getCourses);

router.route("/:id")
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

router.post(
  "/enroll/:id",
  protect,
  enrollCourse
);

module.exports = router;