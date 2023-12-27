const User = require("./../models/User");

const responseMessages = require("../helpers/responseMessages");

const createUser = async userDetails => {
  try {
    const { email } = userDetails;

    const user = await User.find({ email });

    if (user.length) {
      return { success: false, message: responseMessages.createUser.alreadyExists };
    } else {
      const user = await User.create(userDetails);

      return { success: true, user: { id: user._id, email: user.email } };
    }
  } catch (error) {
    return { success: false, message: error?.message || responseMessages.createUser.failed, error };
  }
};

module.exports = { createUser };
