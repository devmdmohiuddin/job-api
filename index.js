require("dotenv").config();
require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRouter = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoutes");

const app = express();

// database
connectDB();

// middleware
app.use([morgan("dev"), express.json()]);

// routes
app.get("/", (_, res) => {
  res.status(200).send("Api is running...");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);

app.use(notFound);
app.use(errorHandler);

// port
const port = process.env.PORT || 5000;

// listener
app.listen(port, () => {
  console.log(`Server is running on development mode and port is ${port}`);
});
