const { logger } = require("../../../logger");

const infoLog = (message, functionName, fileName) => {
  logger.error(message, {
    fileName,
    functionName
  });
};

const errorLog = (message, functionName, fileName, error) => {
  logger.error(message, {
    fileName,
    functionName,
    error
  });
};

module.exports = { infoLog, errorLog };
