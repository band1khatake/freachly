const mongoose = require('mongoose');

class ValidationError extends Error {}

function getErrorFromMongooseError(error) {
  if (error.code === 11000) {
    return new ValidationError(`duplicate key error: ${JSON.stringify(error.keyValue)}`);
  }
  if (error instanceof mongoose.Error.ValidationError) {
    return new ValidationError(error.message);
  }
  return new Error(error.message);
}

function isValidationError(error) {
  return error instanceof ValidationError;
}

module.exports = {
  getErrorFromMongooseError,
  isValidationError,
};
