module.exports = {
  common: {
    invalidMongoID: "Invalid MongoDB ID",
    wentWrong: "Something Went Wrong!",
    fetch: {
      success: "Details fetched successfully!",
      error: "Couldn't fetch details!"
    },
    routeNotFound: "No route exists for this http method!"
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
  event: {
    create: {
      success: "Event added successfully!",
      failed: "Failed to add event!",
      timeSlotNotAvailable: "Event already exists in this time slot at selected location!"
    },
    fetch: {
      success: "Event fetched successfully!",
      failed: "Couldn't fetch events",
      requiredVenueID: "Required event id!"
    }
  },
  venue: {
    fetch: {
      success: "Venue fetched successfully!",
      failure: "Couldn't fetch venue!",
      doesNotExists: "Venue does not exists!"
    },
    create: {
      success: "Venue added successfully!",
      failure: "Couldn't add venue!",
      alreadyExists: "Venue already exists!"
    },
    update: {
      success: "Venue updated successfully!",
      failure: "Couldn't update venue!",
      doesNotExists: "Venue does not exists!"
    },
    delete: {
      success: "Venue deleted successfully!",
      failure: "Couldn't delete venue!",
      doesNotExists: "Venue does not exists!"
    },
    fieldValidation: {
      address: {
        empty: "Venue address name cannot be empty!",
        required: "Venue address name is required!"
      },
      imageURL: {
        empty: "Venue image is required!",
        required: "Venue image is required!"
      },
      mapImageURL: {
        empty: "Venue map image is required!",
        required: "Venue map image is required!"
      }
    }
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
