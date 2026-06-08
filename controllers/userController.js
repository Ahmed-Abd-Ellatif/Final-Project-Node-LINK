const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const User = require("../models/userSchema");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ results: users.length, data: users });
});

exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({ data: user });
});

exports.createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  const createdUser = await user.save();

  res
    .status(201)
    .json({ message: "User created successfully", data: createdUser });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return next(new ApiError("User not found", 404));
  }
  res
    .status(200)
    .json({ message: "User updated successfully", data: updatedUser });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const deletedUser = await User.findByIdAndDelete(userId);
  if (!deletedUser) {
    return next(new ApiError("User not found", 404));
  }
  res.status(204).json({ message: "User deleted successfully" });
});
