const Blog = require("../models/blogModel");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {

    const {
      title,
      content,
      category,
      tags
    } = req.body;

    const blog = await Blog.create({
      user: req.user,
      title,
      content,
      category,
      tags
    });

    res.status(201).json(blog);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find()
      .populate("user", "name email");

    res.json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// GET MY BLOGS
exports.getMyBlogs = async (req, res) => {
  try {

    const blogs = await Blog.find({
      user: req.user
    });

    res.json(blogs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    const updatedBlog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.json(updatedBlog);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {

    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    await blog.deleteOne();

    res.json({
      message: "Blog deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};