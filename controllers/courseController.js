const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Course = require("../models/courseSchema");

exports.getAllCourses = asyncHandler(async (req, res) => {
  let queryObj = { ...req.query };
  const fieldsWithArray = ["category", "level", "language", "price"];
  fieldsWithArray.forEach((field) => {
    if (queryObj[field]) {
      const values =
        typeof queryObj[field] === "string"
          ? queryObj[field].split(",")
          : queryObj[field];
      queryObj[field] = { $in: Array.isArray(values) ? values : [values] };
    }
  });

  let sortBy = "-createdAt";
  if (req.query.sort) {
    sortBy = req.query.sort.split(",").join(" ");
  }

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const excludedFields = ["page", "limit", "sort"];
  excludedFields.forEach((el) => delete queryObj[el]);

  const courses = await Course.find(queryObj)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  const totalCourses = await Course.countDocuments(queryObj);

  res.status(200).json({
    status: "success",
    results: courses.length,
    paginationResult: {
      currentPage: page,
      limit: limit,
      numberOfPages: Math.ceil(totalCourses / limit),
      totalResults: totalCourses,
    },
    data: courses,
  });
});

exports.getCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (course) {
    res.status(200).json({ message: "success", data: course });
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});

exports.createCourse = asyncHandler(async (req, res) => {
  const course = new Course(req.body);
  const createdCourse = await course.save();

  res
    .status(201)
    .json({ message: "Course created successfully", data: createdCourse });
});

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });
  if (!updatedCourse) {
    return next(new ApiError("Course not found", 404));
  }
  res
    .status(200)
    .json({ message: "Course updated successfully", data: updatedCourse });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const deletedCourse = await Course.findByIdAndDelete(courseId);
  if (!deletedCourse) {
    return next(new ApiError("Course not found", 404));
  }
  res
    .status(200)
    .json({ message: "Course deleted successfully", data: deletedCourse });
});
