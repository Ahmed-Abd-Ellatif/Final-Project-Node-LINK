const { check } = require("express-validator");
const validationMiddleware = require("../../middlewares/validationMiddleware");
const User = require("../../models/userSchema");

// SIGNUP VALIDATION
exports.createUserValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Valid email is required")
    .notEmpty()
    .withMessage("Email is required")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already in use");
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .notEmpty()
    .withMessage("Password is required"),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("Role must be either 'user' or 'admin'"),
  check("termsAndConditions")
    .isBoolean()
    .withMessage("Terms and Conditions must be a boolean value")
    .custom((value) => {
      if (value !== true) {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),

  validationMiddleware,
];
// LOGIN VALIDATION
exports.loginValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  check("password").notEmpty().withMessage("Password is required"),
  validationMiddleware,
];
