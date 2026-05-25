const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  createBlog,
  getBlogs,
  getMyBlogs,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

router.route("/")
  .post(protect, createBlog)
  .get(getBlogs);

router.get("/myblogs", protect, getMyBlogs);

router.route("/:id")
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

module.exports = router;