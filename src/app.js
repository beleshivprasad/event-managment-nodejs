const express = require("express");
const cors = require("cors");

const env = require("./config/env");

// import routes
const authRoutes = require("./api/v1/routes/authRoutes");
const usersRoutes = require("./api/v1/routes/usersRoutes");

// creating application instance
const app = express();

// set-up cors
app.use(cors({ origin: env.CLIENT_BASE_URL }));

const { connectDB } = require("./api/v1/helpers/dbHelper");
const { logger } = require("./logger");

// database connection
connectDB();

app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);

app.listen(env.PORT, () => {
  logger.info(`server running on port ${env.PORT}`, {
    functionName: "app.listen",
    fileName: __filename
  });
});
