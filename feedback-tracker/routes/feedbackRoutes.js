const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createFeedback,
  getFeedbacks,
  updateFeedback,
  deleteFeedback
} = require("../controllers/feedbackController");

router.route("/")
  .post(protect, createFeedback)
  .get(protect, getFeedbacks);

router.route("/:id")
  .put(protect, updateFeedback)
  .delete(protect, deleteFeedback);

module.exports = router;