const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    numberOfHours: {
      type: String,
      required: true,
    },
    numberOfMinutes: {
      type: String,
      default: "0",
    },
    price: {
      type: Number,
      required: true,
      
    },
    priceLevel: {
      type: String,
      required: true,
      enum: ["Free", "Paid"],
      default: "Free",
    },
    numberOfLectures: {
      type: Number,
      required: true,
    },
    courseImage: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "English",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Course", courseSchema);
