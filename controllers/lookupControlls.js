const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Category = require("../data/categoryData");
const price = require("../data/priceData");
const SkillLevel = require("../data/skillLevelData");
const Language = require("../data/languageData");

exports.getAllCategories = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: "success",
    results: Category.length,
    data: Category,
  });
});

exports.getAllPriceLevels = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: "success",
    results: price.length,
    data: price,
  });
});
exports.getAllSkillLevels = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: "success",
    results: SkillLevel.length,
    data: SkillLevel,
  });
});
exports.getAllLanguages = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: "success",
    results: Language.length,
    data: Language,
  });
});
