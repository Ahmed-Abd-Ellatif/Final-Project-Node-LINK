const express = require("express");
const router = express.Router();
const Validation = require("../utils/validations/authValidation");
const Controller = require("../controllers/authController");

router
  .route("/signup")
  .post(Validation.createUserValidation, Controller.signup);
router.route("/login").post(Validation.loginValidation, Controller.login);

module.exports = router;
