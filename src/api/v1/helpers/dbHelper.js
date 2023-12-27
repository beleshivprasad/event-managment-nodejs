const mongoose = require("mongoose");
const env = require("../../../config/env");
const { infoLog } = require("../../v1/helpers/loggerHelper");

// enable mongoose debug mode
mongoose.set("debug", (collectionName, method, query, doc) => {
    infoLog(
        `${collectionName}.${method} ${JSON.stringify(query)} doc`,
        "dbHelper mongoose.set(debug)",
        __filename
    );
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

const connectDB = async () => {
    if (env.MONGODB_URI) {
        try {
            await mongoose.connect(env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            logger.info("Connected to MongoDB successfully", {
                functionName: "connectDB",
                fileName: __filename,
            });
        } catch (error) {
            logger.error(`Error connecting to MongoDB:: ${error}`, {
                fileName: __filename,
                functionName: "connectDB",
                error,
            });
        }
    } else {
        throw new Error("Missing MongoDB Connection String!");
    }
};

const isValidMongoID = (id) => {
    try {
        return mongoose.Types.ObjectId.isValid(id);
    } catch (error) {
        return false;
    }
};

module.exports = { connectDB, isValidMongoID };
