const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    contact: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: function (email) {
            const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(email);
          },
          message: 'Invalid email',
        },
      },
    },
    profilePictureUrl: String,
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
