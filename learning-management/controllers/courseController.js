const Course = require("../models/courseModel");

// CREATE COURSE
exports.createCourse = async (req, res) => {
  try {

    const { title, description, instructor } =
      req.body;

    const course = await Course.create({
      title,
      description,
      instructor
    });

    res.status(201).json(course);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// GET COURSES
exports.getCourses = async (req, res) => {
  try {

    const courses = await Course.find();

    res.json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  try {

    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    const updatedCourse =
      await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    res.json(updatedCourse);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
  try {

    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    await course.deleteOne();

    res.json({
      message: "Course deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// ENROLL COURSE
exports.enrollCourse = async (req, res) => {
  try {

    const course = await Course.findById(
      req.params.id
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    course.enrolledStudents.push(req.user);

    await course.save();

    res.json({
      message: "Enrolled successfully",
      course
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};