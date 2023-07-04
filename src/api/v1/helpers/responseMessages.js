module.exports = {
  common: {
    wentWrong: "Something Went Wrong!",
    fetch: {
      success: "Details fetched successfully!",
      error: "Couldn't fetch details!"
    }
  },
  login: {
    success: "Logged in Successfully!",
    failed: "Login failed!",
    token: {
      empty: "Authentication Token cannot be emtpy!",
      required: "Authentication Token Required!",
      invalid: "Invalid Authentication Token!",
      valid: "Token Validated Successfully!"
    }
  },
  createUser: {
    failed: "Failed to add user!",
    success: "User added successfully!",
    alreadyExists: "User already exists!"
  },
  fieldValidation: {
    name: {
      base: "Name must be a string!",
      empty: "Name cannot be emtpy!",
      required: "Name is required!"
    },
    email: {
      base: "Email must be a string!",
      empty: "Email cannot be emtpy!",
      required: "Email is required!",
      notExists: "Email Doesn't Exist!",
      invalid: "Invalid email!"
    },
    password: {
      base: "Password must be a string!",
      empty: "Password cannot be emtpy!",
      required: "Password is required!",
      incorrect: "Incorrect Password!",
      min: "Password must be 8 character long!"
    }
  }
};
