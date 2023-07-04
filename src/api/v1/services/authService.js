const User = require("./../models/User");
const bcrypt = require("bcrypt");

const { generateToken, verifyToken } = require("../helpers/jwtHelper");
const responseMessages = require("../helpers/responseMessages");

const login = async userDetails => {
  try {
    const { email, password } = userDetails;

    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: responseMessages.fieldValidation.email.notExists };
    }

    // compare password (enteredPassword, hashedPassword)
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      return { success: false, message: responseMessages.fieldValidation.password.incorrect };
    }

    const token = await generateToken({ id: user._id, email: user.email, name: user.name });

    return { success: true, token };
  } catch (error) {
    return { success: false, message: error?.message || responseMessages.login.failed };
  }
};

const validateToken = async token => {
  try {
    const response = await verifyToken(token);

    if (!response.success) return { success: false, message: response.message };

    return { success: true };
  } catch (error) {
    return { success: false, message: error?.message, error };
  }
};

module.exports = { login, validateToken };
