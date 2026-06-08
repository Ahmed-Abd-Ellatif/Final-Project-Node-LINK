const express = require("express");
const router = express.Router();
const Controller = require("../controllers/courseController");
const Auth = require("../controllers/authController");
const {
  createCourseValidation,
  updateCourseValidation,
  deleteCourseValidation,
  getCourseValidation,
} = require("../utils/validations/courseValidation");

router
  .route("/")
  .get(Controller.getAllCourses)
  .post(
    Auth.protect,
    Auth.allowedTo("admin"),
    createCourseValidation,
    Controller.createCourse,
  );
router
  .route("/:id")
  .get(getCourseValidation, Controller.getCourse)
  .put(
    Auth.protect,
    Auth.allowedTo("admin"),
    updateCourseValidation,
    Controller.updateCourse,
  )
  .delete(
    Auth.protect,
    Auth.allowedTo("admin"),
    deleteCourseValidation,
    Controller.deleteCourse,
  );

module.exports = router;
