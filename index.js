const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();

// Security
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// Swagger
const swaggerUI = require("swagger-ui-express");
const { swaggerOptions } = require("./utils/swagger");
const { version } = require("./package.json");

const connectDB = require("./db/connect");

// Routes Import and Middleware
const AuthRoutes = require("./routes/auth");
const TestingRoutes = require("./routes/testing");
const NoteRoutes = require("./routes/notes");
const UserRoutes = require("./routes/users");
const ErrorHandler = require("./middleware/ErrorHandler");

const PORT = process.env.PORT || 4000;
const app = express();

// Security Middleware and Express Middleware
mongoose.set("strictQuery", true);
app.use(express.json());
app.use(express.raw());
app.use(xss());
app.use(helmet());
app.use(cors());

app.set("trust proxy", 1);
// 15 mins
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 500 }));

// Routes
app.use("/", [AuthRoutes, TestingRoutes, NoteRoutes, UserRoutes]);
app.use(ErrorHandler);
app.use(
  `/api/${version}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerOptions)
);

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Home Route" });
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("Connected to MongoDB!");
    });
    app.listen(PORT, () => {
      console.log(`Server is up and running on port:${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
