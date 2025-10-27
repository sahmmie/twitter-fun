import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { Tweet, TweetSchema } from './schemas/tweet.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { EmailService } from '../common/services/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tweet.name, schema: TweetSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [TweetsController],
  providers: [TweetsService, EmailService],
  exports: [TweetsService],
})
export class TweetsModule {}

