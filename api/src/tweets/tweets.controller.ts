import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('tweets')
@Controller('tweets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tweet' })
  createTweet(
    @CurrentUser('userId') userId: string,
    @Body() createTweetDto: CreateTweetDto,
  ) {
    return this.tweetsService.createTweet(userId, createTweetDto);
  }

  @Get('my-tweets')
  @ApiOperation({ summary: 'Get tweets created by the current user' })
  getUserTweets(@CurrentUser('userId') userId: string) {
    return this.tweetsService.getUserTweets(userId);
  }

  @Get('shared-with-me')
  @ApiOperation({ summary: 'Get tweets shared with the current user' })
  getSharedTweets(@CurrentUser('userId') userId: string) {
    return this.tweetsService.getSharedTweets(userId);
  }
}

