const mongoose = require("mongoose");
const env = require("../../../config/env");
const { logger } = require("../../../logger");

const connectDB = async () => {
  if (env.MONGODB_URI) {
    try {
      await mongoose.connect(env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      logger.info("Connected to MongoDB successfully", {
        functionName: "connectDB",
        fileName: __filename
      });
    } catch (error) {
      logger.error(`Error connecting to MongoDB:: ${error}`, {
        fileName: __filename,
        functionName: "connectDB",
        error
      });
    }
  } else {
    throw new Error("Missing MongoDB Connection String!");
  }
};

module.exports = { connectDB };
