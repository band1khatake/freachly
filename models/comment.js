const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    hashTags: [String],
    mentions: [String],
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.index({ userId: 1, createdAt: -1 });
commentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
