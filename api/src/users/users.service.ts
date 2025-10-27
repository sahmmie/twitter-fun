import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAllUsers(currentUserId: string) {
    // Get all users except the current user
    const users = await this.userModel
      .find({ _id: { $ne: currentUserId } })
      .select('-password')
      .exec();

    return {
      data: users.map((user) => user.toJSON()),
    };
  }
}

