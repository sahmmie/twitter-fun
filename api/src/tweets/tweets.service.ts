import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tweet, TweetDocument } from './schemas/tweet.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class TweetsService {
  constructor(
    @InjectModel(Tweet.name) private tweetModel: Model<TweetDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private emailService: EmailService,
  ) {}

  async createTweet(userId: string, createTweetDto: CreateTweetDto) {
    const { content, sharedWith } = createTweetDto;

    // Get the author
    const author = await this.userModel.findById(userId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    // Create the tweet
    const tweet = await this.tweetModel.create({
      content,
      author: userId,
      sharedWith: sharedWith.map((id) => new Types.ObjectId(id)),
    });

    // Populate the author
    await tweet.populate('author', 'name email');

    // Send email notifications to shared users
    if (sharedWith.length > 0) {
      const recipients = await this.userModel
        .find({ _id: { $in: sharedWith } })
        .select('name email')
        .exec();

      const recipientData = recipients.map((user) => ({
        email: user.email,
        name: user.name,
      }));

      this.emailService.sendBulkTweetNotifications(
        recipientData,
        content,
        author.name,
      );
    }

    return {
      data: tweet.toJSON(),
    };
  }

  async getUserTweets(userId: string) {
    const tweets = await this.tweetModel
      .find({ author: userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: tweets.map((tweet) => tweet.toJSON()),
    };
  }

  async getSharedTweets(userId: string) {
    const tweets = await this.tweetModel
      .find({ sharedWith: userId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .exec();

    return {
      data: tweets.map((tweet) => tweet.toJSON()),
    };
  }
}

