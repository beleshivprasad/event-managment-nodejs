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
    common: {
      requiredVenueID: "Required event id!",
      doesNotExists: "Event does not exists!"
    },
    create: {
      success: "Event added successfully!",
      failed: "Failed to add event!",
      timeSlotNotAvailable: "Event already exists in this time slot at selected location!",
      endTimeBeforeStartTime: "Event end-time must be after the start-time!",
      eventEndTimeAndStartTimeSame: "Event start-time cannot be same as end-time!"
    },
    fetch: {
      success: "Event fetched successfully!",
      failed: "Couldn't fetch event"
    },
    update: {
      success: "Event updated successfully!",
      failed: "Couldn't update event"
    },
    delete: {
      success: "Event deleted successfully!",
      failed: "Couldn't delete event",
      backDated: "Cannot delete past or ongoing events!"
    },
    fieldValidation: {
      name: {
        empty: "Event name cannot be empty!",
        required: "Event name is required!"
      },
      status: {
        invalid: "Invalid event status( allowed only active,inactive)",
        editNotAllowed: "Cannot edit past or ongoing events!"
      },
      imageURL: {
        empty: "Event image is required!",
        required: "Event image is required!"
      },
      date: {
        base: "Invalid event date format! (YYYY-MM-DD)",
        empty: "Event date cannot be empty!",
        required: "Event date is required!",
        backDate: "Event date must be in the future"
      },
      startTime: {
        empty: "Event start-time cannot be empty!",
        required: "Event start-time is required!",
        alreadyElasped: "Event date and time must be in the future",
        startingSoon: "Cannot edit details as event starting soon!"
      },
      endTime: {
        empty: "Event end-time cannot be empty!",
        required: "Event end-time is required!"
      },
      venueID: {
        empty: "Venue cannot be empty!",
        required: "Venue is required!"
      }
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
      name: {
        empty: "Venue name cannot be empty!",
        required: "Venue name is required!"
      },
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
  siteUsers: {
    create: {
      success: "User record added successfully",
      error: "Failed to add user record!"
    },
    download: {
      success: "User list downloaded successfully!",
      error: "Failed to download users list!"
    },
    fetch: {
      success: "User fetched.",
      error: "Failed to fetch users!.",
      single: {
        success: "User found.",
        error: "User not found."
      }
    },
    fieldValidation: {
      common: {
        invalid: "Invalid input value provided!"
      },
      firstName: {
        base: "First Name must be a string!",
        empty: "First Name cannot be empty",
        required: "First Name is required!"
      },
      lastName: {
        base: "Last Name must be a string!",
        empty: "Last Name cannot be empty",
        required: "Last Name is required!"
      },
      name: {
        base: "Name must be a string!",
        empty: "Name cannot be empty",
        required: "Name is required!"
      },
      email: {
        base: "Email must be a string!",
        empty: "Email cannot be empty",
        required: "Email is required!",
        alreadyExists: "Email is already registered!"
      },
      phoneNumber: {
        empty: "Phone Number cannot be empty",
        required: "Phone Number is required!"
      },
      zipCode: {
        empty: "Zip Code cannot be empty",
        required: "Zip Code is required!"
      },
      prudentialMarketingAccepted: {
        empty: "Prudential Marketing cannot be empty",
        required: "Prudential Marketing is required!"
      },
      userType: {
        base: "User Type must be a string!",
        empty: "User Type cannot be empty!",
        required: "User Type is required!",
        invalid: "Invalid user type provided!"
      },
      ip: {
        empty: "IP address cannot be empty",
        required: "IP address is required!"
      },
      image: {
        empty: "Event image is required!",
        required: "Event image is required!"
      }
    }
  },
  newsTicker: {
    create: {
      success: "News ticker text created successfully!",
      failure: "Failed to created the news ticker text!"
    },
    fetch: {
      success: "News ticker text fetched successfully!",
      failure: "Failed to fetch the news ticker text!"
    },
    update: {
      success: "News ticker updated successfully!",
      failure: "Failed to update the news ticker text!"
    },
    fieldValidation: {
      text: {
        base: "News ticker must be a string",
        required: "News ticker text cannot be empty!"
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
  },
  publishSelfie: {
    success: "Selfie published successfully!",
    failure: "Failed to publish the selfie!",
    selfieNotProvided: "Sefie image not uploaded!"
  },
  eventFlow: {
    success: "Event Flow Fetch Successfully!",
    failure: "Event Flow Fetch failed!"
  }
}
