import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TweetDocument = Tweet & Document;

@Schema({ timestamps: true })
export class Tweet {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId | User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  sharedWith: Types.ObjectId[] | User[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

// Transform for JSON responses
TweetSchema.set('toJSON', {
  transform: function (doc, ret) {
    const transformed: any = ret;
    transformed.id = transformed._id;
    delete transformed._id;
    delete transformed.__v;
    
    // Transform author if it's populated
    if (transformed.author && transformed.author._id) {
      transformed.author = {
        id: transformed.author._id,
        name: transformed.author.name,
        email: transformed.author.email,
      };
    }
    
    // Transform sharedWith array if it's populated
    if (transformed.sharedWith && Array.isArray(transformed.sharedWith)) {
      transformed.sharedWith = transformed.sharedWith.map((user: any) => {
        if (user._id) {
          return user._id.toString();
        }
        return user.toString();
      });
    }
    
    return transformed;
  },
});

