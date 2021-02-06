const UserModel = require('../models/user');
const { getErrorFromMongooseError } = require('../utils/error');

class UserService {
  constructor(param) {
    this.UserModel = param.UserModel;
  }
  dtoToUser(dto) {
    if (!dto) {
      return dto;
    }
    return {
      id: dto._id.toString(),
      contact: dto.contact,
      username: dto.username,
      profilePictureUrl: dto.profilePictureUrl,
      updatedAt: dto.updatedAt,
      createdAt: dto.createdAt,
    };
  }
  async getUserById(id) {
    try {
      return this.dtoToUser(await this.UserModel.findOne({ _id: id }).lean().exec());
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async createNewUser(data) {
    const user = new this.UserModel(data);
    try {
      await user.save();
      return {
        id: user._id.toString(),
      };
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async removeUserById(id) {
    try {
      const result = await this.UserModel.deleteOne({ _id: id }).exec();
      return {
        deletedCount: result.deletedCount,
      };
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }

  async updateUserById(id, userData) {
    try {
      const user = await this.UserModel.findOneAndUpdate(
        { _id: id },
        {
          contact: userData.contact,
          username: userData.username,
          profilePictureUrl: userData.profilePictureUrl,
        },
        {
          runValidators: true,
          new: true,
          lean: true,
        }
      ).exec();
      return this.dtoToUser(user);
    } catch (error) {
      throw getErrorFromMongooseError(error);
    }
  }
}

module.exports = new UserService({
  UserModel,
});
