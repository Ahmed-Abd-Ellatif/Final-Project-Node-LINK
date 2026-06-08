const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");

exports.createCourseValidation = [
  check("title").notEmpty().withMessage("Course title is required"),
  check("description").notEmpty().withMessage("Course description is required"),
  check("instructor").notEmpty().withMessage("Instructor name is required"),
  check("numberOfHours").notEmpty().withMessage("Number of hours is required"),
  check("price").notEmpty().withMessage("Course price is required").isNumeric().withMessage("Course price must be a number"),
  check("priceLevel").notEmpty().withMessage("Course price level is required"),
  check("numberOfLectures")
    .notEmpty()
    .withMessage("Number of lectures is required")
    .isNumeric()
    .withMessage("Number of lectures must be a number"),
  check("courseImage")
    .notEmpty()
    .withMessage("Course image URL is required")
    .isURL()
    .withMessage("Course image must be a valid URL"),
  check("rating")
    .notEmpty()
    .withMessage("Course rating is required")
    .isNumeric()
    .withMessage("Course rating must be a number"),
  check("category").notEmpty().withMessage("Course category is required"),
  check("level").notEmpty().withMessage("Course level is required"),
  check("language").notEmpty().withMessage("Course language is required"),
  validationMiddleware,
];

exports.updateCourseValidation = [
  check("id").isMongoId().withMessage("Invalid course ID"),
  validationMiddleware,
];

exports.deleteCourseValidation = [
  check("id").isMongoId().withMessage("Invalid course ID"),
  validationMiddleware,
];

exports.getCourseValidation = [
  check("id").isMongoId().withMessage("Invalid course ID"),
  validationMiddleware,
];
