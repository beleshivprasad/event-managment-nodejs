const successResponse = (res, message, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, message, error, statusCode = 422) => {
  res.status(statusCode).json({
    success: false,
    message,
    error
  });
};

module.exports = { successResponse, errorResponse };
