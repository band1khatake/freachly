const CommentModel = require('../models/comment');
const { getErrorFromMongooseError } = require('../utils/error');

class CommentService {
  constructor(param) {
    this.CommentModel = param.CommentModel;
  }
  dtoToComment(dto) {
    if (!dto) {
      return dto;
    }
    return {
      id: dto._id.toString(),
      hashTags: dto.hashTags,
      mentions: dto.mentions,
      text: dto.text,
      userId: dto.userId,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
  async getCommentById(id) {
    try {
      return this.dtoToComment(await this.CommentModel.findOne({ _id: id }).lean().exec());
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async createNewComment(data) {
    const comment = new this.CommentModel(data);
    try {
      await comment.save();
      return {
        id: comment._id.toString(),
      };
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async removeCommentById(id) {
    try {
      const result = await this.CommentModel.deleteOne({ _id: id }).exec();
      return {
        deletedCount: result.deletedCount,
      };
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async updateCommentById(id, commentData) {
    try {
      const comment = await this.CommentModel.findOneAndUpdate(
        { _id: id },
        {
          hashTags: commentData.hashTags,
          mentions: commentData.mentions,
          text: commentData.text,
        },
        {
          new: true,
          lean: true,
        }
      ).exec();
      return this.dtoToComment(comment);
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async getCommentByUserId(userId) {
    try {
      return (await this.CommentModel.find({ userId }).lean().exec()).map(this.dtoToComment);
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async getTopHashtags() {
    try {
      return await this.CommentModel.aggregate([
        { $project: { hashTags: 1 } },
        { $unwind: '$hashTags' },
        {
          $group: {
            _id: '$hashTags',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            hashTag: '$_id',
            count: 1,
          },
        },
      ]);
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async getTopMentions() {
    try {
      return this.CommentModel.aggregate([
        { $project: { mentions: 1 } },
        { $unwind: '$mentions' },
        {
          $group: {
            _id: '$mentions',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            mention: '$_id',
            count: 1,
          },
        },
      ]);
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }
}

module.exports = new CommentService({
  CommentModel,
});
