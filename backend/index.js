const env = require("./utils/env")();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/conn");
const cors = require("cors");
const { httpLogger } = require("./middleware/httpLogger");
const { logger } = require("./utils/logger");
const { connectToRedis } = require("./config/redis");
const { globalRateLimiter } = require("./middleware/rateLimiter");

const app = express();

// Call at startup for non-serverless environments
connectToDb();
connectToRedis();

app.use(express.json());
app.use(cookieParser());
app.use(httpLogger)
// app.use(globalRateLimiter)

const allowedOrigins = [
  "http://localhost:3000",
  "https://yourdomain.com",
  "https://blog-website-nine-eta.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.urlencoded({ extended: false }));

// Debug route - before DB middleware to always respond
app.get("/health", async (req, res) => {
  const mongoose = require("mongoose");
  try {
    await connectToDb();
    res.json({
      dbState: mongoose.connection.readyState,
      MONGO_USERNAME: env.MONGO_USERNAME ? "set" : "NOT SET",
      MONGO_PASSWORD: env.MONGO_PASSWORD ? "set" : "NOT SET",
      connected: mongoose.connection.readyState === 1,
    });
  } catch (err) {
    res.json({
      dbState: mongoose.connection.readyState,
      MONGO_USERNAME: env.MONGO_USERNAME ? "set" : "NOT SET",
      MONGO_PASSWORD: env.MONGO_PASSWORD ? "set" : "NOT SET",
      error: err.message,
    });
  }
});

// Ensure DB is connected on each request (safe for Vercel serverless cold starts)
app.use(async (req, res, next) => {
  try {
    await Promise.all([
      connectToDb()
    ])
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Database connection failed" });
  }
});

app.get("/", (req, res) => res.send("ok"));

const userRouter = require("./routes/userRoutes");
app.use("/api/v1", userRouter);

const blogRouter = require("./routes/blogRoutes");
app.use("/api/v1", blogRouter);

const ErrorhandlerMiddleware = require("./middleware/error");

app.use(ErrorhandlerMiddleware);

const PORT = env.PORT || 5000;
app.listen(PORT, () => logger.info("running on port " + PORT));
