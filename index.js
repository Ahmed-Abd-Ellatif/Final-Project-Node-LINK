require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const APiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

const CourseRouter = require("./routes/courseRoute");
const LookupRouter = require("./routes/lookupRoute");
const AuthRouter = require("./routes/authRoute");
const UserRoute = require("./routes/userRoute");

const app = express();
const corsOptions = {
  origin: ["http://localhost:4200","https://final-project-anguler-link.vercel.app/"],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const url = process.env.DB_URL;
const port = process.env.PORT || 3000;

// BODY PARSER MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/courses", CourseRouter);
app.use("/api/lookups", LookupRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRoute);
app.all("/{*path}", (req, res, next) => {
  next(new APiError(`Can't find this route: ${req.originalUrl}`, 404));
});

app.use(globalError);

// CONNECTING TO DATABASE
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the database");
    // LISTENING TO PORT
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
