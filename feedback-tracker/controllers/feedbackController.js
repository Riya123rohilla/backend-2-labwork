const Feedback = require("../models/feedbackModel");

// CREATE feedback
exports.createFeedback = async (req, res) => {
  try {
    const { title, message, rating, category } = req.body;

    const feedback = await Feedback.create({
      user: req.user,
      title,
      message,
      rating,
      category
    });

    res.status(201).json(feedback);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET all feedbacks
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({
      user: req.user
    });

    res.json(feedbacks);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found"
      });
    }

    const updatedFeedback =
      await Feedback.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.json(updatedFeedback);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found"
      });
    }

    await feedback.deleteOne();

    res.json({
      message: "Feedback deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};