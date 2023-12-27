const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { logger } = require("../../../logger");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// hash the password before saving the user
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    next();
  } catch (error) {
    logger.error(error.message, {
      fileName: __filename,
      functionName: "userSchema.pre(save)",
      error
    });

    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
