const express = require("express");
const cors = require("cors");

const env = require("./config/env");

// import routes
const authRoutes = require("./api/v1/routes/authRoutes");
const usersRoutes = require("./api/v1/routes/usersRoutes");
const venueRoutes = require("./api/v1/routes/venueRoutes");
const eventRoutes = require("./api/v1/routes/eventsRoutes");
const newsTickerRoutes = require("./api/v1/routes/newsTickerRoutes");
const siteUserRoutes = require("./api/v1/routes/siteUserRoutes");
const selfieRoutes = require("./api/v1/routes/selfieRoutes");

// import middlewares
const authenticate = require("./api/v1/middlewares/authenticate");

// import helpers
const unmatchedRouteHandler = require("./api/v1/helpers/unmatchedRouteHandler");
const corsOptions = require("./api/v1/helpers/corsHelper");

// creating application instance
const app = express();

//creating router instance
const router = express.Router();

// set-up cors
app.use(cors(corsOptions));

const { connectDB } = require("./api/v1/helpers/dbHelper");
const { logger } = require("./logger");

// database connection
connectDB();

app.use(express.json());

// routes
router.use("/auth", authRoutes);
router.use("/users", authenticate, usersRoutes);
router.use("/venues", authenticate, venueRoutes);
router.use("/events", authenticate, eventRoutes);
router.use("/news_ticker", authenticate, newsTickerRoutes);
router.use("/site_users", authenticate, siteUserRoutes);
router.use("/selfie_app", authenticate, selfieRoutes);

// base router for apis
app.use("/adminapi/api/v1", router);

// handle unmatch route with error
app.use(unmatchedRouteHandler);

app.listen(env.PORT, () => {
  logger.info(`server running on port ${env.PORT}`, {
    functionName: "app.listen",
    fileName: __filename
  });
});
