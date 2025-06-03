require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const connectToDb = require("./db/conn");
const cors = require("cors");
connectToDb();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["https://blog-website-nine-eta.vercel.app/"],
  })
);
app.use(express.urlencoded({ extended: false }));
const userRouter = require("./routes/userRoutes");
app.get("/", (req, res) => res.send("ok"));
app.use("/test", (req, res, next) => {});
app.use("/api/v1", userRouter);
const blogRouter = require("./routes/blogRoutes");
app.use("/api/v1", blogRouter);
const ErrorhandlerMiddleware = require("./middleware/error");
app.use(ErrorhandlerMiddleware);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("running " + PORT));
