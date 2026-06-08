const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userSchema");

// GENERATE TOKEN
const generateToken = (userId, role) =>
  JWT.sign({ userId, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

//   SIGNUP
exports.signup = asyncHandler(async (req, res) => {
  // 1- Create User
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 12),
  });
  // 2- Generate Token
  const token = generateToken(user._id, user.role);
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user,
      token,
    },
  });
});

// LOGIN
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ApiError("Please provide email and password", 400));
  }
  // 1- Check if user exists
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError("Incorrect email or password", 401);
  }
  // 2- Generate Token
  const token = generateToken(user._id, user.role);
  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    data: {
      user,
      token,
    },
  });
});

// PROTECT MIDDLEWARE
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("You are not logged in", 401));
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.userId);
  next();
});

// ALLOWED TO ROLES
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    console.log("ROLES", roles);

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403),
      );
    }
    next();
  });
