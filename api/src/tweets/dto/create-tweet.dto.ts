import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({ example: 'This is my first tweet!' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ 
    example: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    description: 'Array of user IDs to share the tweet with',
    type: [String]
  })
  @IsArray()
  @IsMongoId({ each: true })
  sharedWith: string[];
}

