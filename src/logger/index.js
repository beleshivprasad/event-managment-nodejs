const path = require("path");

const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, "logs", "info.log"),
      level: "info",
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, module, fileName, functionName }) => {
          return `${timestamp} [${level}] ${fileName} (${functionName}) ${message} `;
        })
      )
    }),
    new transports.File({
      filename: path.join(__dirname, "logs", "error.log"),
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.printf(
          ({ timestamp, level, message, stack, module, fileName, functionName, error }) => {
            const errorMessage = error ? `Error: ${error.message}` : "";
            return `${timestamp} [${level}] ${fileName} (${functionName}): ${message}${
              error?.stack ? `\n${error?.stack}` : ""
            }\n${errorMessage}`;
          }
        )
      )
    })
  ]
});

module.exports = { logger };
