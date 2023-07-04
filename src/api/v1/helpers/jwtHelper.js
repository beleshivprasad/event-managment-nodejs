const jwt = require("jsonwebtoken");

const env = require("../../../config/env");
const responseMessages = require("./responseMessages");
const { logger } = require("../../../logger");

const verifyToken = async token => {
  try {
    const user = await jwt.verify(token, env.JWT_SECRET_KEY);

    return {
      success: true,
      data: user
    };
  } catch (error) {
    logger.error(error.message, { fileName: __filename, functionName: "verifyToken", error });

    return {
      success: false,
      message: responseMessages.login.token.invalid,
      error,
      statusCode: 403
    };
  }
};

const generateToken = async user => {
  return await jwt.sign(user, env.JWT_SECRET_KEY, env.JWT_SIGN_OPTIONS);
};

module.exports = { verifyToken, generateToken };
